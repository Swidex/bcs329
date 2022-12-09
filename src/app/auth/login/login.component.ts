import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email,  Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      }
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      if (this.authService.login(val.email, val.password))
        {
          this._snackBar.open("Authentication Success", undefined, {duration: 3600});
          this.router.navigate(['/dashboard']);
          return true;
        }
    }
    this._snackBar.open("Authentication Failure", "Dismiss", {duration: 3600});
    return false;
  }

}
