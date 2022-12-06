import { Component, Inject, OnInit } from '@angular/core';
import { Rentable, User } from '../dataTypes';
import { Rentables } from '../mock-rentables';
import { Users } from '../mock-users';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

  filtered_rentables: Rentable[] = [];
  // rooms-equipment-catering
  filters = ["Room","Equipment","Cater"]
  currentFilter = "Room";

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  openRentMenu(rid: number) {
    const dialogRef = this.dialog.open(RentSelectComponent, {
      data: {
        rentableId: rid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this._snackBar.open("Purchase successful.", undefined, {duration: 3600});
    });
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

  ngOnInit(): void {
    // grab url parameters
    this.route.queryParams
      .subscribe((params: { [x: string]: string; }) => {
        this.loadRentables(params['filter']);
    })
  }
}

@Component({
  selector: 'app-rent-select',
  templateUrl: './rent-select.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentSelectComponent implements OnInit {

  user: User = new User(-1);
  rentable: Rentable = new Rentable(0, "", "", "", 0, 0);

  rentSelectForm = this.formBuilder.group({
    quantity: 0,
    start_date: new Date(),
    end_date: new Date(),
    ccn: 0,
    cvv: 0,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // grab rentable info
    this.rentable = Rentables[this.data.rentableId];

    // load user information
    const uid: string | null = localStorage.getItem('userId');
    if (uid != null) {
      this.user = Users[Number(uid)];
    }
  }

  onSubmit(): void {
    this.user.rental?.push(new Rentable(
      this.rentable.id,
      this.rentable.name,
      this.rentable.type,
      this.rentable.desc,
      this.rentable.price,
      this.rentSelectForm.value.quantity!,
      this.rentSelectForm.value.start_date!,
      this.rentSelectForm.value.end_date!,
    ));
    
  }
  
}