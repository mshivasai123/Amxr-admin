import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  userName: string;
  email: string;
  phone : string;
  otp : string;
  status : string;
  date : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { userName : "Prasad", email: "email@email.com", phone : '93499283032', otp: '23423', status: 'active', date: 'Jan 12th 2022' },
  { userName : "Shiva", email: "test@email.com", phone : '93499283032', otp: '23423', status: 'inactive', date: 'Jan 12th 2022' }
];


@Component({
  selector: 'app-manage-test-users',
  templateUrl: './manage-test-users.component.html',
  styleUrls: ['./manage-test-users.component.scss']
})
export class ManageTestUsersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }  
  
  displayedColumns: string[] = ['userName', 'email','phone','otp','status','date', 'action'];
  dataSource = ELEMENT_DATA;

}
