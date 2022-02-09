import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  languageName: string;
  cost: number;
  offerPercentage : string;
  status : string;
  offerValidity : string;
  date:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { languageName : 'English', cost: 12,offerPercentage: "10%", status : 'active', offerValidity: '30 days',date : 'Jan 12th 2022' },
  { languageName : 'Telugu', cost: 12,offerPercentage: "10%", status : 'inactive', offerValidity: '30 days',date : 'Jan 12th 2022' }
];


@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.scss']
})
export class ManagePlansComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['languageName', 'cost','offerPercentage','status','offerValidity','date', 'action'];
  dataSource = ELEMENT_DATA;


}
