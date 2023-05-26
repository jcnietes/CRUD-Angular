import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor() { }

  canActivate() {
    localStorage.getItem("auth_user")
    if (localStorage.getItem("auth_user") != null) {
      return true
    }
    alert("You don't have admin rights")
    return false;
  }
}
