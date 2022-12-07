import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/dataTypes';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = new User(-1);

  constructor( public authService: AuthService) {}

  ngOnInit(): void {
      this.user = this.authService.getUserData();
  }

}
