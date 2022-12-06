import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { AppComponent } from './app.component';
import { RentComponent } from './rent/rent.component';
import { CourseComponent, CreateCourseComponent } from './course/course.component';
import { ShuttleComponent } from './shuttle/shuttle.component';
import { HomecareComponent } from './homecare/homecare.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewCourseComponent } from './course/view-course/view-course.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'rent', component: RentComponent},
  { path: 'course', component: CourseComponent},
  { path: 'course/view', component: ViewCourseComponent},
  { path: 'shuttle', component: ShuttleComponent},
  { path: 'homecare', component: HomecareComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RentComponent,
    CourseComponent,
    ShuttleComponent,
    HomecareComponent,
    DashboardComponent,
    CreateCourseComponent,
    ViewCourseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
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
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
