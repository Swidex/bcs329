import { Component, OnInit } from '@angular/core';
import { User, Course } from 'src/app/dataTypes';
import { Courses } from 'src/app/mock-courses';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-available-courses',
  templateUrl: './available-courses.component.html',
  styleUrls: ['./available-courses.component.scss']
})
export class AvailableCoursesComponent {

  availableCourses!: Course[];
  user: User;

  constructor(
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    private router: Router,
    authService: AuthService
  ) {
    this.user = authService.getUserData();
    this.refreshCourses();
  }

  refreshCourses(): void {
    this.availableCourses = [];
    for (let Course of Courses) {
      if (!Course.students) continue;
      var notIn = true
      for (let User of Course.students) {
        if (User.id == this.user.id) {
          notIn = false;
          break;
        }
      }
      if (notIn) this.availableCourses.push(Course);
    }
  }

  enroll(courseId: number): boolean {
    for (let s of Courses[courseId].students!) {
      if (s.id == this.user.id) {
        this._snackBar.open("You are already enrolled!", undefined, {duration: 3600});
        this.refreshCourses();
        return false;
      }
    }
    this._snackBar.open("You have enrolled in " + Courses[courseId].name + ".", undefined, {duration: 3600});
    Courses[courseId].students?.push(this.user);
    this.refreshCourses();
    this.router.navigate(['/course/view/'], {queryParams: { cid:courseId }});
    return true;
  }

  createClass() {
    const dialogRef = this.dialog.open(CreateCourseComponent);
    dialogRef.afterClosed().subscribe(result => {
      var msg: string;
      if (result.course) {
        Courses.push(result.course);
        msg = "Successfully created class{id=" + result.course.id + "}!"; 
      } else {
        msg = "Canceled class creation.";
      }
      this.router.navigate(['/course/current']);
      this._snackBar.open(msg, undefined, {duration: 3600});
    });
  }
}

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./available-courses.component.scss']
})
export class CreateCourseComponent {

  user: User
  createCourseForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateCourseComponent>,
    public dialog: MatDialog,
    formBuilder: FormBuilder,
    authService: AuthService) {
      this.user = authService.getUserData();
      this.createCourseForm = formBuilder.group({
        name: [undefined, Validators.required],
        desc: [undefined, Validators.required],
        requirements: undefined,
        start_date: [undefined, Validators.required],
        end_date:[undefined, Validators.required],
      })
    }

  onSubmit(): void {
    var cid: number = Courses.length;
    this.dialogRef.close({
      course: new Course(
        cid,
        this.createCourseForm.value.name!,
        this.user,
        this.createCourseForm.value.desc!,
        this.createCourseForm.value.start_date!,
        this.createCourseForm.value.end_date!,
        [this.user],
        this.createCourseForm.value.requirements!
      )
    });
  }
}
