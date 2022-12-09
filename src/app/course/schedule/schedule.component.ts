import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { Course, User } from 'src/app/dataTypes';
import { Courses } from 'src/app/mock-courses';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  enrolledCourses!: Course[];
  user: User;
  selectedDate: Date;

  constructor(
    public _snackBar: MatSnackBar,
    authService: AuthService
  ) {
    this.selectedDate = new Date();
    this.user = authService.getUserData();
    this.refreshCourses();
  }

  assignmentsDateSorted(c: Course) {
    return c.assignments?.filter(a => a.date.toISOString() == this.selectedDate.toISOString());
  }

  refreshCourses(): void {
    this.enrolledCourses = [];
    for (let Course of Courses) {
      if (!Course.students) continue;
      for (let User of Course.students) {
        if (User.id == this.user.id) {
          this.enrolledCourses.push(Course);
          break;
        }
      }
    }
  }
}
