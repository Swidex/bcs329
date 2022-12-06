import { Component, OnInit } from '@angular/core';
import { Ride, User } from '../dataTypes';
import { Rides } from '../mock-rides';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shuttle',
  templateUrl: './shuttle.component.html',
  styleUrls: ['./shuttle.component.scss']
})
export class ShuttleComponent implements OnInit {

  filtered_rides: Ride[] = [];
  user: User = new User(-1);

  filters = ["Shuttles","Carpools"]
  currentFilter = "Shuttles";

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  loadRides(newFilter?:string):void {
    this.filtered_rides = [];
    if (newFilter != null && this.filters.indexOf(newFilter) > -1) {
      this.currentFilter = newFilter;
    }
    for (let Ride of Rides) {
      if (Ride.type == this.currentFilter) {
        this.filtered_rides.push(Ride);
      }
    }
  }

  createCarpool() {

  }

  ngOnInit(): void {
      this.loadRides();
  }

}
