import { Component } from '@angular/core';
import { Page } from './page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pages: Page[] = [
    { link: "/rent", name: "Rent", icon: "sell"},
    { link: "/course", name: "Courses", icon: "apple"},
    { link: "/shuttle", name: "Shuttle", icon: "bus"},
    { link: "/homecare", name: "Home Care", icon: "woman"},
    { link: "/donation", name: "Donation", icon: "home"},
  ]

}
