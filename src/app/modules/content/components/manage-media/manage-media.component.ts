import { Component, OnInit } from '@angular/core';
import { AddMediaComponent } from '../add-media/add-media.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageMediaService } from '../../manage-media.service';

export interface PeriodicElement {
  poster: string;
  mediaId: string;
  mediaBatchId: string;
  mediaTitle: string;
  mediaType: string;
  languages: string;
  subtitles: string;
  genres: string;
  updatedAt: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { poster: '', mediaId: 'TEL2343432323', mediaBatchId: '2343432323', mediaTitle: "Title", mediaType: '2D', languages: 'Telugu', subtitles: 'English', genres: 'Crime', updatedAt: '6th Jan 2021', status: "active" },
  { poster: '', mediaId: 'TEL2343432323', mediaBatchId: '2343432323', mediaTitle: "Title", mediaType: '2D', languages: 'Telugu', subtitles: 'English', genres: 'Crime', updatedAt: '6th Jan 2021', status: "in-active" }
];


@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss']
})
export class ManageMediaComponent implements OnInit {

  displayedColumns: string[] = ['poster','mediaBatchId' , 'mediaId',  'mediaTitle', 'mediaType', 'languages', 'subtitles', 'genres', 'updatedAt', 'status', 'action'];
  dataSource = ELEMENT_DATA;
  duplicate : boolean = false;

  constructor(
    public dialog: MatDialog,
    public manageMediaService : ManageMediaService
  ) { }

  ngOnInit(): void {
    this.getMediaData();
  }

  getMediaData(){
    this.manageMediaService.getMediaInfo().subscribe(response =>{
      console.log(response?.data)
      this.dataSource = response?.data;
      this.dataSource.forEach((element:any,i:number) => {
        // this.dataSource[i].mediaModuleIcon = 'api/'+element.mediaModuleIcon
        this.dataSource[i].status = element?.status === true ? 'active' : 'in-active'
      });
    })
  }

  getDate(date:Date){
    let newDate = new Date(date);
    return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
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
