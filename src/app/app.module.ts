import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule} from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

import { AppComponent } from './app.component';
import { RentComponent, RentSelectComponent } from './rent/rent.component';
import { HomecareComponent, HomecareSelectComponent } from './homecare/homecare.component';
import { AddAssignmentComponent, EditCourseComponent, ViewCourseComponent } from './course/view-course/view-course.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { routes } from './app.routes';
import { ProfileComponent } from './auth/profile/profile.component';
import { DonationComponent } from './donation/donation.component';
import { AvailableCoursesComponent, CreateCourseComponent } from './course/available-courses/available-courses.component';
import { CurrentCoursesComponent } from './course/current-courses/current-courses.component';
import { ScheduleComponent } from './course/schedule/schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShuttleComponent } from './transportation/shuttle/shuttle.component';
import { CarpoolComponent, CreateCarpoolComponent } from './transportation/carpool/carpool.component';
import { ViewCarpoolComponent, EditCarpoolComponent } from './transportation/view/view-carpool.component';

@NgModule({
  declarations: [
    AppComponent,
    RentComponent,
    RentSelectComponent,
    HomecareSelectComponent,
    HomecareComponent,
    CreateCourseComponent,
    ViewCourseComponent,
    EditCourseComponent,
    AddAssignmentComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DonationComponent,
    AvailableCoursesComponent,
    CurrentCoursesComponent,
    ScheduleComponent,
    DashboardComponent,
    ShuttleComponent,
    CarpoolComponent,
    CreateCarpoolComponent,
    ViewCarpoolComponent,
    EditCarpoolComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    // MATERIAL MODULES
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatRippleModule,
    MatMenuModule,
    MatRadioModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {

}
