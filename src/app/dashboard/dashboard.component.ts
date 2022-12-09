import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../dataTypes';
import { Page } from '../page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  user: User;

  pages: Page[] = [
    { link: "/rent", name: "Rent", icon: "sell"},
    { link: "/course", name: "Courses", icon: "book"},
    { link: "/transportation", name: "Transportation", icon: "directions_bus"},
    { link: "/homecare", name: "Home Care", icon: "home"},
    { link: "/donation", name: "Donation", icon: "attach_money"},
  ]

  constructor(public authService: AuthService) {
    this.user = authService.getUserData();
  }

}