import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { Course, User } from 'src/app/dataTypes';
import { Courses } from 'src/app/mock-courses';

@Component({
  selector: 'app-current-courses',
  templateUrl: './current-courses.component.html',
  styleUrls: ['./current-courses.component.scss']
})
export class CurrentCoursesComponent {
  enrolledCourses!: Course[];
  user: User;

  constructor(
    public _snackBar: MatSnackBar,
    authService: AuthService
  ) {
    this.user = authService.getUserData();
    this.refreshCourses();
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
