import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserModel } from '../model/model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  _registerForm!: FormGroup;

  private API_URL: string = "https://api-001.emberspec.com/api";


  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.getRegisterForm({
      // name: "",
      email: "",
      password: ""
      // password_confirmation: ""
    });
  }

  getRegisterForm(data: IUserModel) {
    this._registerForm = this.formBuilder.group({
      // name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl(data.password, Validators.required)
      // password_confirmation: new FormControl(data.password_confirmation, Validators.required)
    });
  }

  onRegister() {
    if (this._registerForm.valid) {
      this.http.post(this.API_URL + "/register", this._registerForm.value)
        .subscribe({
          next: response => {
            console.log("onRegister Button", response);
            alert("Registered");
            this._registerForm.reset();
          },
          error: error => {
            console.error("Error occurred during registration:", error);
          }
        });
    }
  }
}
