import { Component, OnInit } from '@angular/core';
import { AddModuleComponent } from '../add-module/add-module.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageMediaService } from '../../manage-media.service';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';


export interface PeriodicElement {
  mediaModuleIcon: any;
  mediaModuleName: string;
  mediaModuleType: string;
  updatedAt: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { mediaModuleIcon: 1, mediaModuleName: 'Movies', mediaModuleType: "Single", updatedAt: '6th Jan 2021', status: "Active / Inactive" },
  { mediaModuleIcon: 2, mediaModuleName: 'Series', mediaModuleType: "Sequence", updatedAt: '6th Jan 2021', status: "Active / Inactive" }
];

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  displayedColumns: string[] = ['mediaModuleIcon', 'mediaModuleName', 'mediaModuleType', 'updatedAt', 'status', 'action'];
  dataSource = ELEMENT_DATA;
  mediaType:string;
  statusKey: any;
  selectedMedia : any;

  constructor(
    public dialog: MatDialog,
    public manageMediaService : ManageMediaService
  ) { }

  ngOnInit(): void {
    this.getMediaData();
  }

  getMediaData(){
    this.manageMediaService.getMedia().subscribe(response =>{
      console.log(response?.data)
      this.dataSource = response?.data;
      this.dataSource.forEach((element:any,i:number) => {
        this.dataSource[i].mediaModuleIcon = 'api/'+element.mediaModuleIcon
        this.dataSource[i].status = element?.status === true ? 'active' : 'in-active'
      });
    })
  }

  getDate(date:Date){
    let newDate = new Date(date);
    return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
  }

  type(event:string){
     this.manageMediaService.mediaType.next(event);
  }

  selectMedia(data:any){
    this.statusKey = data.status == "active" ? "in-active" : "active"
    this.selectedMedia = data;
  }
  
  addModule() {
    const dialogRef = this.dialog.open(AddModuleComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getMediaData()
      }
    });
  }

  editMedia(data?:string){
    if(data == 'status'){
      this.selectedMedia.status = this.selectedMedia.status == true ? "active" : "in-active";
      let request = {
        id : this.selectedMedia.id,
        status : this.statusKey == "active" ? true : false,
        mediaModuleName : this.selectedMedia.mediaModuleName
      }
      this.manageMediaService.editMedia(request,'status').subscribe(response =>{
        if(response){
          this.getMediaData()
        }
      })
    } else {
    const dialogRef = this.dialog.open(AddModuleComponent, {
      width: '1000px',
      panelClass: ['edit-modal'],
      data: this.selectedMedia,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getMediaData()
      }
    });
  }
  }

  deleteMedia() {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '500px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.manageMediaService.deleteMedia(this.selectedMedia).subscribe(response=>{
          if(response){
            this.getMediaData()
          }
        })
      }
    });
  
  }


}
