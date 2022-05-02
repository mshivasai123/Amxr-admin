import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-subscribers',
  templateUrl: './add-subscribers.component.html',
  styleUrls: ['./add-subscribers.component.scss']
})
export class AddSubscribersComponent implements OnInit {

  title: string = 'Add Subscriber';
  subscriberForm: FormGroup;
  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<AddSubscribersComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
   }

  ngOnInit(): void {
  }

  initForm() {
    this.subscriberForm = this.fb.group({
      name: [''],
      userType: [''],
      email: [''],
      mobile:[''],
      plan:[''],
      validityStartDateTime: [''],
      validityEndDateTime: ['']
    })
  }

  onSubmit(){
    console.log('submited');
  }

  editSubscriber() {
    console.log('edit')
  }

  closeModel(data?: any) {
    this.dialogRef.close(data);
    this.editMode = false;
    this.title = 'Add Subscriber'
  }

}
