import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-certifications',
  templateUrl: './add-certifications.component.html',
  styleUrls: ['./add-certifications.component.scss']
})
export class AddCertificationsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCertificationsComponent>
  ) { }

  ngOnInit(): void {
  }

}
