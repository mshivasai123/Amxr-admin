import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  icon: string;
  name: string;
  status : string;
  date : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { icon : "", name: "UA+", status : 'active', date: 'July 12th 2022' },
  { icon : "", name: "A", status : 'inactive', date: 'July 12th 2022' }
];


@Component({
  selector: 'app-manage-certifications',
  templateUrl: './manage-certifications.component.html',
  styleUrls: ['./manage-certifications.component.scss']
})
export class ManageCertificationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['icon', 'name','status','date', 'action'];
  dataSource = ELEMENT_DATA;


}
