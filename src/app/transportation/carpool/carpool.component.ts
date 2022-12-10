import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Carpool, User } from 'src/app/dataTypes';
import { Carpools } from 'src/app/mock-rides';

@Component({
  selector: 'app-carpool',
  templateUrl: './carpool.component.html',
  styleUrls: ['./carpool.component.scss']
})
export class CarpoolComponent implements OnInit {
  carpools: Carpool[];
  user!: User;
  tag: string;
  
  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.tag = "";
    this.carpools = [];
  }

  refreshCarpools(newTag: string, trueRefresh?: boolean) {
    if (!trueRefresh && newTag == this.tag) {
      this.tag = "";
    } else {
      this.tag = newTag;
    }
    this.carpools = [];
    for ( let carpool of Carpools ) {
      if (!carpool.group_name) continue;
      if (this.tag == "") {
        this.carpools.push(carpool);
        continue;
      }
      if (this.tag == "joined" && carpool.members!.indexOf(this.user) > -1) {
        this.carpools.push(carpool);
        continue; 
      }
      if (this.tag == carpool.status) {
        this.carpools.push(carpool);
        continue;
      }
    }
  }

  joinGroup(groupId: number): boolean {
    this._snackBar.open("You have joined " + Carpools[groupId].group_name + ".", undefined, {duration: 3600});
    Carpools[groupId].members?.push(this.user);
    this.refreshCarpools("");
    this.router.navigate(['transportation/view/'], {queryParams: { id:groupId }});
    return true;
  }

  createGroup() {
    const dialogRef = this.dialog.open(CreateCarpoolComponent);
    dialogRef.afterClosed().subscribe(result => {
      var msg: string;
      if (result.carpool) {
        Carpools.push(result.carpool);
        msg = "Successfully created carpool{id=" + result.carpool.id + "}!"; 
      } else {
        msg = "Canceled carpool creation.";
      }
      this.refreshCarpools(this.tag, true);
      this._snackBar.open(msg, undefined, {duration: 3600});
      console.log(Carpools);
      this.router.navigate(['/transportation/view'], {queryParams: { id: result.carpool.id }});
    });
  }

  ngOnInit(): void {
    this.refreshCarpools("");
    this.user = this.authService.getUserData();
  }
}

@Component({
  selector: 'app-create-carpool',
  templateUrl: './create-carpool.component.html',
  styleUrls: ['./carpool.component.scss']
})
export class CreateCarpoolComponent {

  user: User
  createCarpoolForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateCarpoolComponent>,
    public dialog: MatDialog,
    formBuilder: FormBuilder,
    authService: AuthService) {
      this.user = authService.getUserData();
      this.createCarpoolForm = formBuilder.group({
        group_name: [undefined, Validators.required],
        destination: [undefined, Validators.required],
        status: ["open", Validators.required],
        time: [undefined, Validators.required]
      })
    }

  onSubmit(): void {
    var form = this.createCarpoolForm.value;
    this.dialogRef.close({
      carpool: new Carpool(
        Carpools.length,
        form.destination,
        form.name,
        form.time,
        form.status,
        this.user,
        [this.user]
      )
    });
  }
}
