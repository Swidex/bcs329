import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/mock-users';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'src/app/dataTypes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  register: boolean = false;
  registerForm = this.formBuilder.group({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  })
  
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
      
  }

  onSubmit(): void {
    var fail:boolean = false;
    for (let User of Users) {
      if (User.email == this.registerForm.value.email) {
        fail = true;
        break;
      }
    }
    if (fail) {
      this._snackBar.open("This email has already been registered.", "Dismiss");
    } else {
      var uid:number = Users.length;
      Users.push(new User(
        uid,
        this.registerForm.value.first_name!,
        this.registerForm.value.last_name!,
        this.registerForm.value.email!,
        this.registerForm.value.password!
      ));
      localStorage.setItem('userId', String(uid));
      this._snackBar.open("Registration Successful", undefined, {duration: 3600});
      this.router.navigate(['/dashboard']);
    }
    
  }

}
