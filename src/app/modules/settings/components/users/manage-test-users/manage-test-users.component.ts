import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddUsersComponent } from '../add-users/add-users.component';


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

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }  
  
  displayedColumns: string[] = ['userName', 'email','phone','otp','status','date', 'action'];
  dataSource = ELEMENT_DATA;

  addusers() {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
  }

}
