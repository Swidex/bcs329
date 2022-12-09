import { Component } from '@angular/core';
import { User } from 'src/app/dataTypes';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: User;

  constructor(public authService: AuthService) {
    this.user = authService.getUserData();
  }

}
