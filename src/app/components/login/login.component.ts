import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUserModel } from '../model/model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  _loginFormGroup!: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.loginForm({
      email: "admin@gmail.com",
      password: "admin"
    });
  }

  loginForm(data: IUserModel) {
    this._loginFormGroup = this.formBuilder.group({
      email: new FormControl(data.email, Validators.required),
      password: new FormControl(data.password, Validators.required)
    })
  }

  onLogin() {
    // if (this._loginFormGroup.valid) {
    this.authService.getLoginUser(this._loginFormGroup.value)
      .subscribe({
        next: data => {
          if (data) {
            this.authService.saveToken(data.token)
            this.authService.saveUser(data)
            this._loginFormGroup.reset()
            this.router.navigate(['Dashboard']);
            console.log("onLogin Button =>>", data.token),
              (error) => {
                console.log('An error occurred during login. Please try again later.', error)
              }
          }
          else {
            return false
          }
        },
        error: error => {
          console.log("Error occurred while logging in:", error);
        }
      })
  }
}
