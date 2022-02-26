import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-add-certifications',
  templateUrl: './add-certifications.component.html',
  styleUrls: ['./add-certifications.component.scss']
})
export class AddCertificationsComponent implements OnInit {
  file:any
  objectURL:any = ''
  constructor(
    public dialogRef: MatDialogRef<AddCertificationsComponent>,private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
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
