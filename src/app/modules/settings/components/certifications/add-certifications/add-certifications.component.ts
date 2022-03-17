import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import { CertificationsService } from '../certifications.service';
@Component({
  selector: 'app-add-certifications',
  templateUrl: './add-certifications.component.html',
  styleUrls: ['./add-certifications.component.scss']
})
export class AddCertificationsComponent implements OnInit {
  file:any
  objectURL:any = ''
  title = 'Add Certificate'
  editMode = false;
  certificationForm : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddCertificationsComponent>,private sanitizer:DomSanitizer,
    public fb : FormBuilder,
    public certificationsService : CertificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.initForm();  
    if(data){
    this.title = 'Edit Certificate';
    this.editMode = true;
    this.certificationForm.patchValue({mediaCertificateName:data.mediaCertificateName,fileData: data?.fileData});
    }
  }

  ngOnInit(): void {
  }
  
  initForm() {
    this.certificationForm = this.fb.group({
      mediaCertificateName: [''],
      fileData: [''],
    })
  }

  onSubmit(){
    console.log(this.certificationForm.getRawValue());
    if(this.certificationForm.getRawValue()){
      const requestParams = this.certificationForm.getRawValue();
      requestParams.fileData = this.file;
      this.certificationsService.addCertification(requestParams).subscribe(response=>{
        if(response){
          this.closeModel('submited');
        }
      })
    }
  }

  closeModel(data?: any) {
    this.dialogRef.close(data);
    this.editMode = false;
    this.title = 'Add Certification'
  }

  editCertification() {
    let editData = this.certificationForm.getRawValue()
    editData.id = this.data.id
    editData.fileData = this.file;
    this.certificationsService.editCertification(editData).subscribe(response => {
      if (response) {
        this.closeModel('submited');
      }
    })
  }

  uploadImage(event: any){
    console.log(event)
    this.file = event.target.files[0]
    if (this.objectURL) {
     // revoke the old object url to avoid using more memory than needed
     URL.revokeObjectURL(this.objectURL);  
   }
 
   const fileD = this.file;
   this.objectURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
   console.log(this.objectURL,"this.objectURL")
  }

}
