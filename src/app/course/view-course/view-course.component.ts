import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { Assignment, Course, User } from 'src/app/dataTypes';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../mock-users';
import { Courses } from 'src/app/mock-courses';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createInjectableType } from '@angular/compiler';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {

  user: User = new User(0);
  cid: number = 0;
  course: Course = new Course(
    0,
    "",
    new User(-1),
    "",
    new Date(),
    new Date(),
    []
  );

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {}

  leaveCourse(): void {
    var index = this.course.students.indexOf(this.user);
    if (index > -1) {
      this.course.students.splice(index, 1);
    }
    this._snackBar.open("You have left " + this.course.name + ".", undefined, {duration: 3600});
    this.router.navigate(['/course']);
  }

  editCourse(cid: number): void {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      data: {
        courseId: cid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addAssignment(cid: number): void {
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      data: {
        courseId: cid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    // load user information
    const uid: string | null = localStorage.getItem('userId');
    if (uid != null) {
      this.user = Users[Number(uid)];
    }

    this.route.queryParams
      .subscribe(params => {
        if (Courses[params['cid']].students.indexOf(this.user) > -1) {
          this.course = Courses[params['cid']];
        } else {
          // bad permissions
          this._snackBar.open("You do not have permissions to view this page!", undefined, {duration: 3600});
          this.router.navigate(['/course']);
        }
    })
  }

}

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  course: Course = new Course(0, "", new User(-1), "", new Date(), new Date(), [], "", []);

  editCourseForm = this.formBuilder.group({
    name: '',
    desc: "",
    requirements: '',
    start_date: new Date(),
    end_date: new Date()
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // load course info into form
    this.course = Courses[this.data.courseId];
    this.editCourseForm = this.formBuilder.group({
      name: this.course.name,
      desc: this.course.desc,
      requirements: this.course.requirements!,
      start_date: this.course.start_date,
      end_date: this.course.end_date
    });
  }

  onSubmit() {
    this.course.name = this.editCourseForm.value.name!;
    this.course.desc = this.editCourseForm.value.desc!;
    this.course.requirements = this.editCourseForm.value.requirements!;
    this.course.start_date = this.editCourseForm.value.start_date!;
    this.course.end_date = this.editCourseForm.value.end_date!;
    this._snackBar.open("Edited the course.", undefined, {duration: 3600});
    this.editCourseForm.reset();
  }

}

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  course: Course = new Course(0, "", new User(-1), "", new Date(), new Date(), [], "", []);

  addAssignmentForm = this.formBuilder.group({
    name: '',
    description: "",
    date: new Date()
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.course = Courses[this.data.courseId];
  }

  onSubmit(): void {
    this.course.assignments?.push(new Assignment(
      this.addAssignmentForm.value.name!,
      this.course.name,
      this.addAssignmentForm.value.date!,
      this.addAssignmentForm.value.description!
    ));
    this._snackBar.open("Created a new assignment.", undefined, {duration: 3600});
    this.addAssignmentForm.reset();
  }
}