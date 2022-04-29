import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginUser : any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const userdata: any = localStorage.getItem('userdata') ? localStorage.getItem('userdata') : ''
    this.loginUser = JSON.parse(userdata).email
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
