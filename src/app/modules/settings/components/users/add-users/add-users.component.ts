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

  constructor(
    public dialogRef: MatDialogRef<AddUsersComponent>,
    public usersService : UsersService,
    public fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.initForm();
    if(data){
    this.title = 'Edit User';
    this.editMode = true;
    this.userForm.patchValue({name:data.name,email: data?.email,mobile : data.mobile,status: data?.status});
  }
}

  ngOnInit(): void {
  }

  
  initForm(){
    this.userForm = this.fb.group({
      email: [''],
      password: [''],
      roleId: [''],
      mobile: [''],
      status: ['']
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
    this.usersService.editUser(editData).subscribe(response =>{
      if(response){
        this.closeModel('submited');
      }
    })
  }



}
