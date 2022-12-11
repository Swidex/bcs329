import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Page } from './page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public authService: AuthService,
    ) {}

  pages: Page[] = [
    { link: "/dashboard", name:"Dashboard", icon: "dashboard"},
    { link: "/rent", name: "Rent", icon: "sell"},
    { link: "/course", name: "Courses", icon: "apple"},
    { link: "/transportation", name: "Transportation", icon: "bus"},
    { link: "/homecare", name: "Home Care", icon: "woman"},
    { link: "/donation", name: "Donation", icon: "home"},
  ]

}
