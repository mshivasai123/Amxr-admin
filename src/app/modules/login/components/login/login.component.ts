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
  loginForm : FormGroup; 
  constructor(
    private router: Router,
    public formBuilder : FormBuilder,
    public loginService : LoginService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    console.log("submit",this.loginForm.getRawValue());
    const payload = this.loginForm.getRawValue()
    this.loginService.loginUser(payload).subscribe(responce=>{
       if(responce){
         this.router.navigate(['/subscribers']);
       }
    })
  }

}
