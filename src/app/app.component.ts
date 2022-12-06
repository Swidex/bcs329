import { Component } from '@angular/core';
import { Page } from './page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bcs329';
  pages: Page[] = [
    { link: "/dashboard", name: "Dashboard", icon: "home"},
    { link: "/rent", name: "Rent", icon: "sell"},
    { link: "/course", name: "Courses", icon: "apple"},
    { link: "/shuttle", name: "Shuttle", icon: "bus"},
    { link: "/homecare", name: "Home Care", icon: "woman"},
  ]
}
