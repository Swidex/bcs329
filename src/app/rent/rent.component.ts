import { Component, Inject, OnInit } from '@angular/core';
import { Rentable, User } from '../dataTypes';
import { Rentables } from '../mock-rentables';
import { Users } from '../mock-users';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

  user: User;
  filtered_rentables: Rentable[];
  filters = ["Room","Equipment","Cater"]
  currentFilter = "Room";

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.user = authService.getUserData();
    this.filtered_rentables = [];
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
  }
  loadRentables(newFilter?:string): void {
    this.filtered_rentables = [];
    if (newFilter != null && this.filters.indexOf(newFilter) > -1) {
      this.currentFilter = newFilter;
    }
    for (let Rentable of Rentables) {
      if (Rentable.type == this.currentFilter) {
        this.filtered_rentables.push(Rentable);
      }
    }
  }
  hasRented(rentableId: number): boolean {
    if (!this.user.rental) return false;
    for (let r of this.user.rental) {
      if (r.id == rentableId) return true;
    }
    return false;
  }
  ngOnInit(): void {
    // grab url parameters
    this.route.queryParams
      .subscribe((params: { [x: string]: string; }) => {
        this.loadRentables(params['filter']);
    })
  }
  cancelRental(rid: number) {
    var index = 0;
    for (let a of this.user.rental!) {
      if (a.id == rid) {
        this.user.rental?.splice(index, 1);
        break
      }
      index++;
    }
  }
  openRentMenu(rid: number) {
    const dialogRef = this.dialog.open(RentSelectComponent, {
      data: {
        rentableId: rid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      var msg: string;
      if (result) {
        if (!this.user.rental) { this.user.rental = []; }
        this.user.rental!.push(result.data);
        msg = "Purchase rental for " + result.data.type + " (" + result.data.name + ", " + result.data.price + "$) successful!";
      } else {
        msg = "Purchase canceled."
      }
      this._snackBar.open(msg , "Dismiss", {duration: 3600});
    });
  }
}

@Component({
  selector: 'app-rent-select',
  templateUrl: './rent-select.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentSelectComponent implements OnInit {

  user: User;
  rentable: Rentable;
  rentSelectForm: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RentSelectComponent>,
    public dialog: MatDialog,
    formBuilder: FormBuilder,
    authService: AuthService,
  ) {
    this.user = authService.getUserData();
    this.rentable = new Rentable(0, "", "", "", 0, 0);
    this.rentSelectForm = formBuilder.group({
      quantity: [undefined, Validators.required],
      start_date: [undefined, Validators.required],
      end_date: [undefined, Validators.required],
      ccn: [undefined, Validators.required],
      cvv: [undefined, Validators.required],
    });
  }

  ngOnInit(): void {
    this.rentable = Rentables[this.data.rentableId];
  }

  onSubmit(): void {
    this.dialogRef.close(
      { data: new Rentable(
          this.rentable.id,
          this.rentable.type,
          this.rentable.name,
          this.rentable.desc,
          this.rentable.price,
          this.rentSelectForm.value.quantity,
          this.rentSelectForm.value.start_date,
          this.rentSelectForm.value.end_date,
      )}
    );
  }
}