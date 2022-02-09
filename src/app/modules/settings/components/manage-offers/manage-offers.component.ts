import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  offerName: string;
  offerCode: string;
  offerPercentage : string;
  offerStatus : string;
  offerValidity : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { offerName : 'Refer', offerCode: "CO66734",offerPercentage: "10%", offerStatus : 'active', offerValidity: 'July 12th 2022' },
  { offerName : 'Refer', offerCode: "CO66734",offerPercentage: "10%", offerStatus : 'inactive', offerValidity: 'July 12th 2022' }
];


@Component({
  selector: 'app-manage-offers',
  templateUrl: './manage-offers.component.html',
  styleUrls: ['./manage-offers.component.scss']
})
export class ManageOffersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['offerName', 'offerCode','offerPercentage','offerStatus','offerValidity', 'action'];
  dataSource = ELEMENT_DATA;


}
