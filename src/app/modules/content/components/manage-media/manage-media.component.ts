import { Component, OnInit } from '@angular/core';
import { AddMediaComponent } from '../add-media/add-media.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface PeriodicElement {
  poster: string;
  mediaId: string;
  title: string;
  mediaType: string;
  languages : string;
  subtitles: string;
  genres: string;
  updatedDate: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { poster: '', mediaId: 'TEL2343432323', title: "Title",mediaType:'2D,3D',languages:'Telugu,Hindi',subtitles:'English, Kannada',genres:'Crime, Thriller', updatedDate: '6th Jan 2021', status: "Active / Inactive" },
  { poster: '', mediaId: 'TEL2343432323', title: "Title",mediaType:'2D,3D',languages:'Telugu,Hindi',subtitles:'English, Kannada',genres:'Crime, Thriller', updatedDate: '6th Jan 2021', status: "Active / Inactive" }
];


@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss']
})
export class ManageMediaComponent implements OnInit {
  
  displayedColumns: string[] = ['poster', 'mediaId', 'title','mediaType','languages','subtitles','genres', 'updatedDate', 'status', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addMedia() {
    const dialogRef = this.dialog.open(AddMediaComponent, {
      width: '1300px',
      panelClass: ['add-modal','xxl-modal']
    });
  }

}
