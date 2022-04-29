import { Component, OnInit } from '@angular/core';
import { AddMediaComponent } from '../add-media/add-media.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PeriodicElement {
  poster: string;
  mediaId: string;
  batchId: string;
  title: string;
  mediaType: string;
  languages: string;
  subtitles: string;
  genres: string;
  updatedDate: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { poster: '', mediaId: 'TEL2343432323', batchId: '2343432323', title: "Title", mediaType: '2D', languages: 'Telugu', subtitles: 'English', genres: 'Crime', updatedDate: '6th Jan 2021', status: "active" },
  { poster: '', mediaId: 'TEL2343432323', batchId: '2343432323', title: "Title", mediaType: '2D', languages: 'Telugu', subtitles: 'English', genres: 'Crime', updatedDate: '6th Jan 2021', status: "in-active" }
];


@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss']
})
export class ManageMediaComponent implements OnInit {

  displayedColumns: string[] = ['poster', 'mediaId', 'batchId' , 'title', 'mediaType', 'languages', 'subtitles', 'genres', 'updatedDate', 'status', 'action'];
  dataSource = ELEMENT_DATA;
  duplicate : boolean = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addMedia() {
    const dialogRef = this.dialog.open(AddMediaComponent, {
      width: '1100px',
      panelClass: ['add-modal', 'xxl-modal'],
      data : this.duplicate
    });
  }

  duplicateMedia(type:boolean){
     this.duplicate = type
  }

}
