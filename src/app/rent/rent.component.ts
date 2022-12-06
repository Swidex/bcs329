import { Component, OnInit } from '@angular/core';
import { Rooms, Equipments, Caters } from '../mock-items';

@Component({
  selector: 'app-item',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

  rooms = Rooms;
  equipments = Equipments;
  caters = Caters;
  title = "Renting";

  currentTab = "room";

  setTab(tab: string) {
    this.currentTab = tab;
  }

  isCurrentTab(tab: string) {
    if (tab == this.currentTab) {
      return true;
    }
    return false;
  }

  constructor() { }
  ngOnInit(): void {}
}
