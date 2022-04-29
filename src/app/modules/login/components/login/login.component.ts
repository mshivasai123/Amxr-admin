import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import jwt_decode from "jwt-decode";

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
    this.loginService.loginUser(payload).subscribe(responce => {
      if (responce) {
        localStorage.setItem('token',responce?.token ? responce.token : '')
        let decoded: any = jwt_decode(responce?.token);
        console.log(decoded)
        localStorage.setItem('userdata',JSON.stringify(decoded.result))
        this.router.navigate(['/subscribers']);
      } 
    })
  }

}
