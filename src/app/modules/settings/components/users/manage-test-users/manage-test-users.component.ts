import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';
import { AddUsersComponent } from '../add-users/add-users.component';
import { UsersService } from '../users.service';


export interface PeriodicElement {
  userName: string;
  email: string;
  phone : string;
  // otp : string;
  status : string;
  date : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { userName : "Prasad", email: "email@email.com", phone : '93499283032',  status: 'Active', date: 'Jan 12th 2022' },
  { userName : "Shiva", email: "test@email.com", phone : '93499283032',  status: 'InActive', date: 'Jan 12th 2022' }
];


@Component({
  selector: 'app-manage-test-users',
  templateUrl: './manage-test-users.component.html',
  styleUrls: ['./manage-test-users.component.scss']
})
export class ManageTestUsersComponent implements OnInit {

  selectedUser : any;
  searchedKeyword: string;
  statusKey: any;

  constructor(
    public dialog: MatDialog,
    public usersService : UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }  

  getDate(date:Date){
    let newDate = new Date(date);
    return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
  }

  startAndEndDate(start:Date,end:Date){
    let startDate = new Date(start);
    let endDate = new Date(end);
    return `${startDate.getDate()}-${startDate.getMonth()}-${startDate.getFullYear()} - ${endDate.getDate()}-${endDate.getMonth()}-${endDate.getFullYear()}`
  }

  getUsers(){
    this.usersService.getUser().subscribe(response =>{
      this.dataSource = response?.data;
      this.dataSource.forEach((element:any,i:number) => {
        this.dataSource[i].status = element?.status === true ? 'active' : 'in-active'
      });
    })
  }
  
  displayedColumns: string[] = [ 'email','mobile','passCode','createdAt','status', 'action'];
  dataSource : any;

  addusers() {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getUsers()
      }
    });
  }


  selectUser(data:any){
    this.statusKey = data.status == "active" ? "in-active" : "active"
    this.selectedUser = data;
  }

  editUser(data?:any){
    if(data == 'status'){
      this.selectedUser.status = this.selectedUser.status == true ? "active" : "in-active";
      let request = {
        id : this.selectedUser.id,
        status : this.statusKey == "active" ? true : false
      }
      this.usersService.editUser(request,'status').subscribe(response =>{
        if(response){
          this.getUsers()
        }
      })
    } else {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: '1000px',
      panelClass: ['edit-modal'],
      data: this.selectedUser,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getUsers()
      }
    });
  }
  }

  deleteUser() {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '500px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.usersService.deleteUser(this.selectedUser).subscribe(response=>{
          if(response){
            this.getUsers()
          }
        })
      }
    });
  
  }

}
