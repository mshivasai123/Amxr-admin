import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-add-media-provider',
  templateUrl: './add-media-provider.component.html',
  styleUrls: ['./add-media-provider.component.scss']
})
export class AddMediaProviderComponent implements OnInit {

  file: any
  objectURL: any = ''
  title = 'Add Certificate'
  editMode = false;
  providerForm: FormGroup;
  baseUrl = environment.basicUrl;
  src: any;

  constructor(
    public dialogRef: MatDialogRef<AddMediaProviderComponent>,
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public mediaProviderService: ProviderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
    if (data) {
      this.title = 'Edit Media Provider';
      this.editMode = true;
      let fileD = this.baseUrl + data?.profileImage
      this.src = this.sanitizer.bypassSecurityTrustUrl(fileD);
      this.providerForm.patchValue({ 
        mediaProviderName: data.mediaProviderName, 
        fileData: this.src, email: data.email, contact: data.contact, 
        contentValidityStartDate: data.contentValidityStartDate, 
        contentValidityEndDate: data.contentValidityEndDate,
        exclusivePercentage: data.exclusivePercentage,
        nonExclusivePercentage: data.nonExclusivePercentage
      });
    }
  }

  ngOnInit(): void {
  }

  initForm() {
    this.providerForm = this.fb.group({
      mediaProviderName: [''],
      fileData: [''],
      email: [''],
      contact: [''],
      contentValidityStartDate: [''],
      contentValidityEndDate: [''],
      exclusivePercentage: [''],
      nonExclusivePercentage: ['']
    })
  }

  onSubmit() {
    console.log(this.providerForm.getRawValue());
    if (this.providerForm.getRawValue()) {
      const requestParams = this.providerForm.getRawValue();
      requestParams.fileData = this.file;
      this.mediaProviderService.addProvider(requestParams).subscribe(response => {
        if (response) {
          this.closeModel('submited');
        }
      })
    }
  }

  editProvider() {
    let editData = this.providerForm.getRawValue()
    editData.id = this.data.id
    editData.fileData = this.file;
    this.mediaProviderService.editProvider(editData).subscribe(response => {
      if (response) {
        this.closeModel('submited');
      }
    })
  }

  closeModel(data?: any) {
    this.dialogRef.close(data);
    this.editMode = false;
    this.title = 'Add Media Provider'
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
