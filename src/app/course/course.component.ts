import { Component, OnInit } from '@angular/core';
import { Course, Assignment, User } from '../dataTypes';
import { Users } from '../mock-users';
import { Courses  } from '../mock-courses';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  unenrolled_courses: Course[] = [];
  enrolled_courses: Course[] = [];
  assignments: Assignment[] = [];
  selectedDate: Date | null = new Date();
  user: User = new User(-1);

  // apply-current-schedule
  tabs = ["apply","current","schedule"]
  currentTab = "apply";

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
    ) {}
  
  setTab(tab: string) {
    this.currentTab = tab;
  }
  isCurrentTab(tab: string) {
    if (tab == this.currentTab) {
      return true;
    }
    return false;
  }
  enroll(courseId: number) {
    console.log(courseId + " - " + Courses[courseId].name);
    for (let s of Courses[courseId].students!) {
      if (s.id == this.user.id) {
        this._snackBar.open("You are already enrolled!", undefined, {duration: 3600});
        this.loadCourses();
        return 1;
      }
    }
    this._snackBar.open("You have enrolled in " + Courses[courseId].name + ".", undefined, {duration: 3600});
    Courses[courseId].students?.push(this.user);
    this.loadCourses();
    return 0;
  }
  createClass() {
    const dialogRef = this.dialog.open(CreateCourseComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadCourses();
    });
  }
  loadCourses(): void {
    this.unenrolled_courses = [];
    this.enrolled_courses = [];
    for (let Course of Courses) {
      var found: boolean = false;
      if (!Course.students) { continue; }
      for (let student of Course.students!) {
        if (student.id == this.user.id) {
          this.enrolled_courses.push(Course);
          found = true;
          break;
        }
      }
      if (!found) {this.unenrolled_courses.push(Course);}
    }
  }
  ngOnInit(): void {

    // grab url parameters
    this.route.queryParams
      .subscribe((params: { [x: string]: string; }) => {
        if (this.tabs.indexOf(params['tab']) > -1) {
          this.currentTab = params['tab'];
        }
    })

    // load user information
    const uid: string | null = localStorage.getItem('token');
    if (uid != null) {
      this.user = Users[Number(uid)];
    }
    
    // load courses
    this.loadCourses();
  }
}

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CreateCourseComponent implements OnInit{

  user: User = new User(-1);

  createCourseForm = this.formBuilder.group({
    name: '',
    professor: '',
    desc: "",
    requirements: '',
    start_date: new Date(),
    end_date: new Date()
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
  }

  onSubmit() {
    var cid: number = Courses.length;
    Courses.push(new Course(
      cid,
      this.createCourseForm.value.name!,
      this.user,
      this.createCourseForm.value.desc!,
      this.createCourseForm.value.start_date!,
      this.createCourseForm.value.end_date!,
      [this.user],
      this.createCourseForm.value.requirements!
    ));
    this.router.navigate(['/course/view'],{queryParams: {cid: cid}});
  }

}