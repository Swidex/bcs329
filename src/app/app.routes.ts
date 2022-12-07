import { Routes } from '@angular/router';
import { RentComponent } from './rent/rent.component';
import { CourseComponent } from './course/course.component';
import { ShuttleComponent } from './shuttle/shuttle.component';
import { HomecareComponent } from './homecare/homecare.component';
import { ViewCourseComponent } from './course/view-course/view-course.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './auth/profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'rent', component: RentComponent, canActivate: [AuthGuard]},
  { path: 'course', component: CourseComponent, canActivate: [AuthGuard]},
  { path: 'course/view', component: ViewCourseComponent, canActivate: [AuthGuard]},
  { path: 'shuttle', component: ShuttleComponent},
  { path: 'homecare', component: HomecareComponent, canActivate: [AuthGuard]}
];
