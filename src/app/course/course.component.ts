import { Component, OnInit } from '@angular/core';
import { Course, Assignment } from '../course';
import { Courses  } from '../mock-courses';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

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

  // apply-current-schedule
  tabs = ["apply","current","schedule"]
  currentTab = "apply";

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute
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

  enroll(id: number) {
    console.log("Enrolling in class...");
    for (let Course of Courses) {
      if (Course.id == id) {
        if (Course.enrolled == true) {
          // already enrolled
          throw new Error("Already enrolled in " + Course.name + "!");
        } else {
          Course.enrolled = true;
          this.loadCourses();
        }
      }
    }
    console.log("Failed to find class.");
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
      if (Course.enrolled != true) {
        this.unenrolled_courses.push(Course);
      } else {
        this.enrolled_courses.push(Course);
      }
    }
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params: { [x: string]: string; }) => {
        if (this.tabs.indexOf(params['tab']) > -1) {
          this.currentTab = params['tab'];
        }
    })
    this.loadCourses();
  }
}

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CreateCourseComponent{

  createCourseForm = this.formBuilder.group({
    name: '',
    professor: '',
    desc: "",
    requirements: '',
    start_date: new Date(),
    end_date: new Date()
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    Courses.push(new Course(
      Courses.length - 1,
      this.createCourseForm.value.name!,
      this.createCourseForm.value.professor!,
      this.createCourseForm.value.desc!,
      this.createCourseForm.value.start_date!,
      this.createCourseForm.value.end_date!,
      true,
      this.createCourseForm.value.requirements!
    ));
  }

}