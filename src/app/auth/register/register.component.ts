import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/mock-users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/dataTypes';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) {
    this.registerForm = this.formBuilder.group({
      email: [undefined, [Validators.required, Validators.email]],
      first_name: [undefined, [Validators.required]],
      last_name: [undefined, [Validators.required]],
      password: [undefined, [Validators.required, Validators.minLength(6)]],
    })
  }

  register(): boolean {
    const val = this.registerForm.value;

    if (val.email && val.first_name && val.last_name && val.password )
    {
      for (let User of Users) {
        if (User.email == this.registerForm.value.email) {
          this._snackBar.open("This email has already been registered.", "Dismiss");
          return false;
        }
      }

      var uid: number = Users.length;
      Users.push(new User(
        uid,
        val.first_name,
        val.last_name,
        val.email,
        val.password,
      ));

      if (this.authService.login(val.email, val.password))
      {
        this._snackBar.open("Authentication Success", undefined, {duration: 3600});
        this.router.navigate(['/dashboard']);
        return true;
      }
    }
    
    return false;
  }
}
