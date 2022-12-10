import { Component, Inject, OnInit } from '@angular/core';
import { Assignment, Course, User } from 'src/app/dataTypes';
import { ActivatedRoute, Router } from '@angular/router';
import { Courses } from 'src/app/mock-courses';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent {

  user: User;
  course!: Course;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    authService: AuthService,
    ) {
      this.user = authService.getUserData();
      this.route.queryParams
        .subscribe(params => {
            this.course = Courses[params['cid']];
      })
    }

  leaveCourse(): boolean {
    // splice doesn't work with only length of one
    if (this.course.students!.length == 1) {
      this.course.students! = [];
      this._snackBar.open("You have left " + this.course.name + ".", undefined, {duration: 3600});
      this.router.navigate(['/course']); 
      return false;
    }

    if (this.user == this.course.prof!) {
      Courses.splice(this.course.id!, 1);
      this._snackBar.open("You have disbanded " + this.course.name + ".", undefined, {duration: 3600});
      this.router.navigate(['/transportation/carpool']);
      return true;
    }

    var index = this.course.students!.indexOf(this.user);
    if (index && index > -1) {
      this.course.students!.splice(index, 1);
    }
    this._snackBar.open("You have left " + this.course.name + ".", undefined, {duration: 3600});
    this.router.navigate(['/course']); 
    return true;
  }

  editCourse(): void {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      data: {
        courseId: this.course.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.open("Edited class", undefined, {duration: 3600});
      } else {
        this._snackBar.open("Canceled edit", undefined, {duration: 3600});
      }
      
    });
  }

  addAssignment(): void {
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      data: {
        courseId: this.course.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class EditCourseComponent {

  course!: Course;
  editCourseForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    formBuilder: FormBuilder) {
      this.course = Courses[this.data.courseId];
      this.editCourseForm = formBuilder.group({
        name: [this.course.name, Validators.required],
        desc: [this.course.desc, Validators.required],
        requirements: this.course.requirements,
        start_date: [this.course.start_date, Validators.required],
        end_date: [this.course.end_date, Validators.required],
      });
    }

  onSubmit(): void {
    this.course.name = this.editCourseForm.value.name!;
    this.course.desc = this.editCourseForm.value.desc!;
    this.course.requirements = this.editCourseForm.value.requirements!;
    this.course.start_date = this.editCourseForm.value.start_date!;
    this.course.end_date = this.editCourseForm.value.end_date!;
  }

}

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class AddAssignmentComponent {

  course: Course;
  addAssignmentForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.course = Courses[this.data.courseId];
      this.addAssignmentForm = formBuilder.group({
        name: [undefined, Validators.required],
        description: [undefined, Validators.required],
        date: [undefined, Validators.required],
      });
    }

  onSubmit(): void {
    this.course.assignments?.push(new Assignment(
      this.addAssignmentForm.value.name!,
      this.course.name!,
      this.addAssignmentForm.value.date!,
      this.addAssignmentForm.value.description!
    ));
    this._snackBar.open("Created a new assignment.", undefined, {duration: 3600});
    this.addAssignmentForm.reset();
  }
}