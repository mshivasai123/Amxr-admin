import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-subscribers',
  templateUrl: './add-subscribers.component.html',
  styleUrls: ['./add-subscribers.component.scss']
})
export class AddSubscribersComponent implements OnInit {

  title: string = 'Add Subscriber';
  subscriberForm: FormGroup;
  editMode = false;
  objectURL: any = '';
  file: any

  constructor(
    public dialogRef: MatDialogRef<AddSubscribersComponent>,
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
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
      fileData:[''],
      validityStartDateTime: [''],
      validityEndDateTime: ['']
    })
  }

  uploadImage(event: any) {
    console.log(event)
    this.file = event.target.files[0]
    if (this.objectURL) {
      // revoke the old object url to avoid using more memory than needed
      URL.revokeObjectURL(this.objectURL);
    }

    const fileD = this.file;
    this.objectURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    console.log(this.objectURL, "this.objectURL")
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
