import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ManageMediaService } from '../../manage-media.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {

  mediaModuleForm: FormGroup;
  file: any
  objectURL: any = '';
  title = 'Add Module'
  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<AddModuleComponent>,
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public manageMediaService : ManageMediaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.initForm();
    if (data) {
      this.title = 'Edit Media';
      this.editMode = true;
      let fileD = data?.mediaModuleIcon
      this.objectURL = this.sanitizer.bypassSecurityTrustUrl(fileD);
      this.mediaModuleForm.patchValue({ 
        mediaModuleName: data.mediaModuleName, 
        fileData: this.objectURL, 
        mediaModuleType: data.mediaModuleType
      });
    }
  }

  ngOnInit(): void {
  }

  initForm() {
    this.mediaModuleForm = this.fb.group({
      mediaModuleName: [''],
      fileData: [''],
      mediaModuleType: [''],
    })
  }

  onSubmit() {
    console.log(this.mediaModuleForm.getRawValue());
    if (this.mediaModuleForm.getRawValue()) {
      const requestParams = this.mediaModuleForm.getRawValue();
      requestParams.fileData = this.file;
      this.manageMediaService.addMedia(requestParams).subscribe(response => {
        if (response) {
          this.closeModel('submited');
        }
      })
    }
  }

  editMedia() {
    let editData = this.mediaModuleForm.getRawValue()
    editData.id = this.data.id
    editData.fileData = this.file;
    this.manageMediaService.editMedia(editData).subscribe(response => {
      if (response) {
        this.closeModel('submited');
      }
    })
  }

  closeModel(data?: any) {
    this.dialogRef.close(data);
    this.editMode = false;
    this.title = 'Add Module'
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

}
