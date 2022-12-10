import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User, Carpool } from 'src/app/dataTypes';
import { Carpools } from 'src/app/mock-rides';

@Component({
  selector: 'app-view-carpool',
  templateUrl: './view-carpool.component.html',
  styleUrls: ['./view-carpool.component.scss']
})
export class ViewCarpoolComponent {
  user: User;
  carpool!: Carpool;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public authService: AuthService,
  ) {
    this.user = authService.getUserData();
    this.route.queryParams
      .subscribe(params => {
        this.carpool = Carpools[params['id']];
      })
  }

  editCarpool(): void {
    const dialogRef = this.dialog.open(EditCarpoolComponent, {
      data: {
        carpoolId: this.carpool.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.open("Edited group", undefined, {duration: 3600});
      } else {
        this._snackBar.open("Canceled edit", undefined, {duration: 3600});
      }
      
    });
  }

  leaveCarpool(): boolean {
    if (this.user == this.carpool.owner!) {
      this._snackBar.open("You have disbanded " + this.carpool.group_name + ".", undefined, {duration: 3600});
      this.router.navigate(['/transportation/carpool']);
      Carpools.splice(this.carpool.id!, 1);
      return true;
    }
    var index = this.carpool.members!.indexOf(this.user);
    if (index && index > -1) {
      this.carpool.members!.splice(index, 1);
    }
    this._snackBar.open("You have left " + this.carpool.group_name + ".", undefined, {duration: 3600});
    this.router.navigate(['/transportation/carpool']);
    return true;
  }
}

@Component({
  selector: 'app-edit-carpool',
  templateUrl: './edit-carpool.component.html',
  styleUrls: ['./view-carpool.component.scss']
})
export class EditCarpoolComponent {

  carpool!: Carpool;
  editCarpoolForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditCarpoolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    formBuilder: FormBuilder) {
      this.carpool = Carpools[this.data.carpoolId];
      this.editCarpoolForm = formBuilder.group({
        group_name: [this.carpool.group_name, Validators.required],
        destination: [this.carpool.destination, Validators.required],
        status: [this.carpool.status, Validators.required],
        time: [this.carpool.time, Validators.required]
      });
    }

  onSubmit(): void {
    var form = this.editCarpoolForm.value;

    this.carpool.destination = form.destination,
    this.carpool.group_name = form.group_name,
    this.carpool.time = form.time,
    this.carpool.status = form.status
    this.dialogRef.close();
  }

}