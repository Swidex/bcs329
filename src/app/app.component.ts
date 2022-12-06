import { Component, OnInit } from '@angular/core';
import { User } from './dataTypes';
import { Users } from './mock-users';
import { Page } from './page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pages: Page[] = [
    { link: "/dashboard", name: "Dashboard", icon: "home"},
    { link: "/rent", name: "Rent", icon: "sell"},
    { link: "/course", name: "Courses", icon: "apple"},
    { link: "/shuttle", name: "Shuttle", icon: "bus"},
    { link: "/homecare", name: "Home Care", icon: "woman"},
  ]

  user: User = new User(-1);

  constructor() {}

  refreshLoginBar(): void {
    const uid: number = Number(localStorage.getItem('userId'));
    if ( uid != null && uid - 1 > -1 ) {
      this.user = Users[uid];
      console.log(this.user.first_name);
    }
  }

  ngOnInit(): void {
    this.refreshLoginBar();
  }
}
