import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddMediaTypeComponent } from '../add-media-type/add-media-type.component';


export interface PeriodicElement {
  mediaType: string;
  status : string;
  date : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { mediaType: "2D", status : 'Active', date: 'Jan 12th 2022' },
  { mediaType: "3D-TB", status : 'InActive', date: 'Jan 12th 2022' }
];


@Component({
  selector: 'app-media-type',
  templateUrl: './media-type.component.html',
  styleUrls: ['./media-type.component.scss']
})
export class MediaTypeComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['mediaType','date','status', 'action'];
  dataSource = ELEMENT_DATA;

  addMediaType() {
    const dialogRef = this.dialog.open(AddMediaTypeComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
  }

}
