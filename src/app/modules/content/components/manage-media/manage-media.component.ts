import { Component, OnInit } from '@angular/core';
import { AddMediaComponent } from '../add-media/add-media.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageMediaService } from '../../manage-media.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DateReorderComponent } from '../date-reorder/date-reorder.component';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';

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
  reOrderingDate: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
];


@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss']
})
export class ManageMediaComponent implements OnInit {

  displayedColumns: string[] = ['poster', 'mediaBatchId', 'mediaId', 'mediaTitle', 'mediaType', 'languages', 'subtitles', 'genres', 'updatedAt', 'reOrderDate', 'status', 'action'];
  dataSource:any = ELEMENT_DATA;
  duplicate: boolean = false;
  searchedKeyword: string;
  moduleId = ""
  selectedMedia: any
  statusKey: any;
  isLiveKey:any;
  selectedModuleName: any;

  constructor(
    public dialog: MatDialog,
    public manageMediaService: ManageMediaService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    let state: any = this.location.getState()
    this.moduleId = state?.moduleId
    this.selectedModuleName = state?.selectedModule?.mediaModuleName ?? ''
    if (this.moduleId) {
      this.getMediaData(this.moduleId);
    } else {
      this.router.navigate(['/content'])
    }
    console.log(state, "state")
  }

  selectMedia(data: any) {
    this.statusKey = data.status == "active" ? "in-active" : "active"
    this.isLiveKey = data.isLive == "live" ? "test" : "live"
    this.selectedMedia = data;
  }

  getMediaData(id: any) {
    this.manageMediaService.getMediaInfo(id).subscribe(response => {
      console.log(response?.data)
      this.dataSource = response?.data;
      console.log(this.dataSource, "datasource")
      this.dataSource.forEach((element: any, i: number) => {
        // this.dataSource[i].mediaModuleIcon = 'api/'+element.mediaModuleIcon
        element.reOrderingDate = element.reOrderingDate ?? element.createdAt
        element.subtitles = element?.media_full_videos[0]?.media_subtitles.map((val: any) => val.language.name).join(',')
        this.dataSource[i].status = element?.status === true ? 'active' : 'in-active'
        this.dataSource[i].isLive = element?.isLive === true ? 'live' : 'test'
      });
      this.dataSource.sort((a:any, b:any) => { return new Date(b.reOrderingDate).valueOf() - new Date(a.reOrderingDate).valueOf(); })
    })
  }

  getDate(date: Date) {
    let newDate = new Date(date);
    return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
  }

  addMedia() {
    this.duplicate = false;
    const dialogRef = this.dialog.open(AddMediaComponent, {
      width: '1100px',
      panelClass: ['add-modal', 'xxl-modal'],
      data: { duplicate: this.duplicate, moduleId: this.moduleId, isEdit: false }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'close') {
        this.getMediaData(this.moduleId);
      }
    });
  }

  duplicateMedia(type: boolean) {
    this.duplicate = type
  }

  mediaData(media: any) {
    this.selectedMedia = media
    console.log(media, "media")
  }

  editMediaData() {
    this.duplicate = false;
    this.editMedia();
  }

  updateIsLive(){
      let request = {
        id: this.selectedMedia.id,
        status: this.isLiveKey == "live" ? true : false,
      }
      this.manageMediaService.editLiveTest(request).subscribe(response => {
        if (response) {
          this.getMediaData(this.moduleId);
        }
      })
  }

  editMedia(data?: string) {
    if (data == 'status') {
      this.selectedMedia.status = this.selectedMedia.status == true ? "active" : "in-active";
      let request = {
        id: this.selectedMedia.id,
        status: this.statusKey == "active" ? true : false,
        mediaModuleName: this.selectedMedia.mediaModuleName
      }
      this.manageMediaService.editMediaInfo(request, 'status').subscribe(response => {
        if (response) {
          this.getMediaData(this.moduleId);
        }
      })
    } else {
      const dialogRef = this.dialog.open(AddMediaComponent, {
        width: '1100px',
        panelClass: ['add-modal', 'xxl-modal'],
        data: { duplicate: this.duplicate, moduleId: this.moduleId, mediaData: this.selectedMedia, isEdit: true }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'close') {
          this.getMediaData(this.moduleId);
        }
      });
    }
  }

  reOrder() {
    this.duplicate = false;
    const dialogRef = this.dialog.open(DateReorderComponent, {
      width: '500px',
      panelClass: ['add-modal'],
      data: {reOrderingDate : this.selectedMedia.reOrderingDate ?? this.selectedMedia.createdAt}
    });
    dialogRef.afterClosed().subscribe(selectedDate => {
      if (selectedDate) {
        let data = this.dataSource.map((val: any, i: number) => {
          if (val.id == this.selectedMedia.id) val.reOrderingDate = selectedDate;
          return { id: val.id, reOrderingDate: val.reOrderingDate };
        })
        this.manageMediaService.reOrderMedia(data).subscribe((val) => {
          this.getMediaData(this.moduleId);
        }, (err) => {

        })
      }
    });
  }

  deleteMedia(){
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '500px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.manageMediaService.deleteMedia(this.selectedMedia).subscribe(response=>{
          if(response){
            this.getMediaData(this.moduleId);
          }
        })
      }
    });
  }

}
