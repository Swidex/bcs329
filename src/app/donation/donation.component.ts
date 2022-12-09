import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../dataTypes';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent {
  donationForm:FormGroup;
  user: User;
  
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public authService: AuthService,
  ) {
    this.user = authService.getUserData();
    this.donationForm = this.fb.group({
      anonymous: false,
      amount: [undefined, Validators.required],
      message: ""
    });
  }

  onSubmit(anonymous: boolean): void {
    if (anonymous) {
      this._snackBar.open("(Anonymous, " + this.donationForm.value.amount + "$ USD) " + this.donationForm.value.message);
    } else {
      this._snackBar.open("(" + this.user.first_name + " " + this.user.last_name + ", " + this.donationForm.value.amount + "$ USD) " + this.donationForm.value.message);
    }
  }
}
