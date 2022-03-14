import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword = false;
  loginForm: FormGroup;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const payload = this.loginForm.getRawValue()
    this.router.navigate(['/subscribers']);
    this.loginService.loginUser(payload).subscribe(responce => {
      if (responce) {
        localStorage.setItem('token',responce?.token ? responce.token : '')
        this.router.navigate(['/subscribers']);
      } else {
        responce = {
          "success": 1,
          "message": "login successfully",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjEsImVtYWlsIjoic2hpdmFAZ21haWwuY29tIiwibW9iaWxlIjoiOTk5NDc5MzkyMyIsInN0YXR1cyI6dHJ1ZSwiY3JlYXRlZEJ5IjoxLCJtb2RpZmllZEJ5IjoxLCJjcmVhdGVkQXQiOiIyMDIyLTAzLTA5VDE2OjUxOjMzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTAzLTA5VDE2OjUxOjMzLjAwMFoiLCJyb2xlSWQiOjF9LCJpYXQiOjE2NDcwMDg1MDUsImV4cCI6MTY0NzAxMjEwNX0.xBo1WifqZ-6AWOFpCPWqU4pUF-8oYon3Rm7ex4cF4ys"
      }
      this.router.navigate(['/subscribers']);
      }
    })
  }

}
