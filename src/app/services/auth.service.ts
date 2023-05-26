import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const token_key = 'auth_token';
const user_key = 'auth_user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${}'
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  private user_API_Url = "https://api-001.emberspec.com/";


  getLoginUser(data: any): Observable<any> {
    return this.http.post<any>(this.user_API_Url + "api/login", data, this.httpHeaders);
  }

  loggedIn() {
    return !!localStorage.getItem("token")
  }

  logoutUser(): void {
    window.localStorage.clear()
    this.router.navigate(['Login'])
  }

  getToken(): string {
    return window.localStorage.getItem(token_key)
  }

  saveToken(token: string): void {
    console.log("AUTH SERVICE saveToken =>>", token)
    window.localStorage.removeItem(token_key)
    window.localStorage.setItem(token_key, token)
  }

  saveUser(user: any): void {
    console.log("AUTH SERVICE saveUser =>>", user)
    window.localStorage.removeItem(user_key)
    window.localStorage.setItem(user_key, JSON.stringify(user))
  }

  // GET ALL USER
  // getUser() {
  //   // return this.http.get<any>(this.user_API_Url);
  //   const user = window.localStorage.getItem(user_key);
  //   console.log("AUTH SERVICE getUser =>>", user)

  //   if (user) {
  //     return JSON.parse(user);
  //   }
  //   return {};
  // }

  // Get User by ID
  // getUserID(id: number) {
  //   return this.http.get<any>(this.user_API_Url + 'user' + id)
  // }
}

