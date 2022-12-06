import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/course';
import { ActivatedRoute } from '@angular/router';
import { Courses } from 'src/app/mock-courses';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {

  cid: number = 0;
  course: Course = new Course(
    0,
    "",
    "",
    "",
    new Date(),
    new Date(),
    false,
  );

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (Courses[params['cid']].enrolled) {
          this.course = Courses[params['cid']];
        }
    })
      
  }

}
