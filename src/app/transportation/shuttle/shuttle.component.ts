import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { Shuttle, User } from 'src/app/dataTypes';
import { Shuttles } from '../../mock-rides';

@Component({
  selector: 'app-shuttle',
  templateUrl: './shuttle.component.html',
  styleUrls: ['./shuttle.component.scss']
})
export class ShuttleComponent implements OnInit {

  shuttles: Shuttle[];
  user!: User;
  
  constructor(
    public authService: AuthService,
    public _snackBar: MatSnackBar
  ) {
    this.shuttles = [];
  }

  refreshShuttles() {
    this.shuttles = [];
    for ( let shuttle of Shuttles ) {
      if (shuttle.name) this.shuttles.push(shuttle);
    }
  }

  ngOnInit(): void {
    this.refreshShuttles();
    this.user = this.authService.getUserData();
  }
}
