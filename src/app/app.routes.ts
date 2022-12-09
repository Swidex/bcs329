import { Routes } from '@angular/router';
import { RentComponent } from './rent/rent.component';
import { HomecareComponent } from './homecare/homecare.component';
import { ViewCourseComponent } from './course/view-course/view-course.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './auth/profile/profile.component';
import { DonationComponent } from './donation/donation.component';
import { AvailableCoursesComponent } from './course/available-courses/available-courses.component';
import { CurrentCoursesComponent } from './course/current-courses/current-courses.component';
import { ScheduleComponent } from './course/schedule/schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShuttleComponent } from './transportation/shuttle/shuttle.component';
import { CarpoolComponent } from './transportation/carpool/carpool.component';

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'donation', component: DonationComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'transportation',canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ShuttleComponent,
      },
      {
        path: 'shuttle',
        component: ShuttleComponent,
      },
      {
        path: 'carpool',
        component: CarpoolComponent,
      },
    ]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'rent', component: RentComponent, canActivate: [AuthGuard]},
  { path: 'course', canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CurrentCoursesComponent,
      },
      {
        path: 'current',
        component: CurrentCoursesComponent,
      },
      {
        path: 'available',
        component: AvailableCoursesComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: 'view',
        component: ViewCourseComponent,
      }
    ]},
  { path: 'homecare', component: HomecareComponent, canActivate: [AuthGuard]}
];
