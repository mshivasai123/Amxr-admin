import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  title : string = 'Add User';
  editMode = false;
  userForm : FormGroup;
  userList : any;

  constructor(
    public dialogRef: MatDialogRef<AddUsersComponent>,
    public usersService : UsersService,
    public fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.initForm();
    this.getRoleType();
    if(data){
    this.title = 'Edit User';
    this.editMode = true;
    console.log(data)
    this.userForm.patchValue({name:data.name,email: data?.email,mobile : data.mobile,status: data?.status, roleId:data.roleId, validityStartDate: data.validityStartDate,validityEndDate: data.validityEndDate});
    console.log(this.userForm.getRawValue())
  }
}

  ngOnInit(): void {
  }

  getRoleType(){
    this.usersService.getRole().subscribe(response =>{
      this.userList = response?.data;
    })
  }

  
  initForm(){
    this.userForm = this.fb.group({
      email: [''],
      roleId: [],
      mobile: [],
      validityStartDate: [''],
      validityEndDate: [''],
      status: [''],
    })
  }

  onSubmit(){
    console.log(this.userForm.getRawValue());
    if(this.userForm.getRawValue()){
      const requestParams = this.userForm.getRawValue()
      this.usersService.addUser(requestParams).subscribe(response=>{
        if(response){
          this.closeModel('submited');
        }
      })
    }
  }

  closeModel(data?:any){
    this.dialogRef.close(data);
    this.editMode = false;
    this.title = 'Add User'
  }

  editUser(){
    let editData = this.userForm.getRawValue()
    editData.id = this.data.id
    editData.password = this.data.password
    this.usersService.editUser(editData).subscribe(response =>{
      if(response){
        this.closeModel('submited');
      }
    })
  }



}
