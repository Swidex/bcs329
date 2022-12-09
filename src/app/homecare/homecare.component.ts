import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { User, Activity } from '../dataTypes';
import { Activities } from '../mock-activities';

@Component({
  selector: 'app-homecare',
  templateUrl: './homecare.component.html',
  styleUrls: ['./homecare.component.scss']
})
export class HomecareComponent implements OnInit {

  user: User = new User(-1);
  tags: string[] = [];
  currentTag: string = "";
  filteredActivies: Activity[] = [];

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  loadTags() {
    this.tags = [];
    for (let a of Activities) {
      if (!a.tags) { continue; }
      for (let tag of a.tags) {
        if (this.tags.indexOf(tag) == -1) {
          this.tags.push(tag);
        }
      }
    }
    this.tags.push("all");
  }

  hasRequested(requestId: number): boolean {
    if (!this.user.activity) return false;
    for (let r of this.user.activity) {
      if (r.id == requestId) return true;
    }
    return false;
  }

  refreshActivities(newTag: string) {
    this.currentTag = newTag;
    this.filteredActivies = [];
    for (let a of Activities) {
      if (a.name && (this.currentTag == "all" || a.tags!.indexOf(this.currentTag) > -1)) {
        this.filteredActivies.push(a);
      }
    }
  }

  removeActivity(rid: number) {
    var index = 0;
    for (let a of this.user.activity!) {
      if (a.id == rid) {
        this.user.activity?.splice(index, 1);
        break
      }
      index++;
    }
  }

  requestActivity(rid: number) {
    const dialogRef = this.dialog.open(HomecareSelectComponent, {
      data: {
        rentableId: rid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      var msg: string;
      if (result.activity) {
        this.user.activity!.push(result.activity);
        msg = "Request for " + result.activity.name + " successful!";
      } else {
        msg = "Purchase canceled."
      }
      this._snackBar.open(msg , "Dismiss", {duration: 3600});
    });
  }

  ngOnInit(): void {
      this.user = this.authService.getUserData();
      this.loadTags();
      this.refreshActivities("all")
  }

  strcmp(str: string): boolean {
    return str.toLowerCase() == this.currentTag.toLowerCase();
  }

}

@Component({
  selector: 'app-homecare-select',
  templateUrl: './homecare-select.component.html',
  styleUrls: ['./homecare.component.scss']
})
export class HomecareSelectComponent implements OnInit {

  user: User;
  activity: Activity;
  homecareSelectForm: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<HomecareSelectComponent>,
    public dialog: MatDialog,
    formBuilder: FormBuilder,
    authService: AuthService,
  ) {
    this.user = authService.getUserData();
    this.activity = new Activity(-1);
    this.homecareSelectForm = formBuilder.group({
      start_date: [undefined, Validators.required],
      time: [undefined, Validators.required],
      duration: [undefined, Validators.required],
    });
  }

  ngOnInit(): void {
    this.activity = Activities[this.data.rentableId];
  }

  onSubmit(): void {
    this.dialogRef.close(
      { activity: new Activity(
          this.activity.id,
          this.activity.name,
          this.activity.tags,
          this.activity.fee,
          this.homecareSelectForm.value.start_date, // break down into date and time
          this.homecareSelectForm.value.duration,
      )}
    );
  }
}