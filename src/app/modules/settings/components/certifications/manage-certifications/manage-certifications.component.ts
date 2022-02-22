import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCertificationsComponent } from '../add-certifications/add-certifications.component';

export interface PeriodicElement {
  icon: string;
  name: string;
  status : string;
  date : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { icon : "", name: "UA+", status : 'Active', date: 'July 12th 2022' },
  { icon : "", name: "A", status : 'InActive', date: 'July 12th 2022' }
];


@Component({
  selector: 'app-manage-certifications',
  templateUrl: './manage-certifications.component.html',
  styleUrls: ['./manage-certifications.component.scss']
})
export class ManageCertificationsComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['icon', 'name','date','status', 'action'];
  dataSource = ELEMENT_DATA;

  addCertificate() {
    const dialogRef = this.dialog.open(AddCertificationsComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
  }

}
