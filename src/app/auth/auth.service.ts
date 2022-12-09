import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dataTypes';
import { Users } from '../mock-users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
  ) { }

  login(email:string, password:string) {
    for (let u of Users) {
      if (u.email == email && u.password == password)
      {
        this.setSession(String(u.id))
        return true;
      }
    }
    return false;
  }

  private setSession(uid:String) {
    const token: string = String(uid);
    localStorage.setItem("token", token);
  }

  public isLoggedIn() {
    const status = localStorage.getItem("token");
    return status != null;
  }

  public getUserData():User {
    const uid = localStorage.getItem("token");
    if (uid) {
      return Users[Number(uid)];
    } else {
      return new User(-1);
    }
    
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }
}