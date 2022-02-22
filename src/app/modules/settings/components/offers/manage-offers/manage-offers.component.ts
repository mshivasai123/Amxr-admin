import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddOffersComponent } from '../add-offers/add-offers.component';

export interface PeriodicElement {
  offerName: string;
  offerCode: string;
  offerPercentage : string;
  offerStatus : string;
  offerValidity : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { offerName : 'Refer', offerCode: "CO66734",offerPercentage: "10%", offerStatus : 'Active', offerValidity: 'July 12th 2022' },
  { offerName : 'Refer', offerCode: "CO66734",offerPercentage: "10%", offerStatus : 'InActive', offerValidity: 'July 12th 2022' }
];


@Component({
  selector: 'app-manage-offers',
  templateUrl: './manage-offers.component.html',
  styleUrls: ['./manage-offers.component.scss']
})
export class ManageOffersComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['offerName', 'offerCode','offerPercentage','offerValidity','offerStatus', 'action'];
  dataSource = ELEMENT_DATA;

  addOffer() {
    const dialogRef = this.dialog.open(AddOffersComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
  }

}
