import { Component, OnInit, ViewChild } from '@angular/core';
import { AddModuleComponent } from '../add-module/add-module.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageMediaService } from '../../manage-media.service';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  mediaModuleIcon: any;
  mediaModuleName: string;
  mediaModuleType: string;
  updatedAt: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  @ViewChild('table') table: MatTable<any>;
  enableReorder=false;
  displayedColumns: string[] = ['mediaModuleIcon', 'mediaModuleName', 'mediaModuleType', 'updatedAt', 'status', 'action'];
  dataSource = ELEMENT_DATA;
  mediaType:string;
  statusKey: any;
  selectedModuleId: any = ''
  selectedModule:any;
  selectedMedia : any;
  searchedKeyword: string;

  constructor(
    public dialog: MatDialog,
    public manageMediaService : ManageMediaService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getMediaData();
  }

  getMediaData(){
    this.manageMediaService.getMedia().subscribe(response =>{
      console.log(response?.data)
      this.dataSource = response?.data;
      this.dataSource.sort((a:any,b:any)=> {return a.orderId - b.orderId});
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

  type(event:string,id: any,element:any){
     this.manageMediaService.mediaType.next(event);
     this.selectedModuleId = id;
     this.selectedModule = element;
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
        this.manageMediaService.deleteModule(this.selectedMedia).subscribe(response=>{
          if(response){
            this.getMediaData()
          }
        })
      }
    });
  
  }

  manageMedia(){
    this.router.navigateByUrl('/content/manage-media', { state: {moduleId:this.selectedModuleId,selectedModule:this.selectedModule} })
  }

  dropTable(event: CdkDragDrop<any>) {
    if(this.enableReorder){
      const prevIndex = this.dataSource.findIndex((d:any) => d === event.item.data);
      moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
      this.table.renderRows();
    }
  }

  saveOrder(){
    let data = this.dataSource.map((val:any,i:number)=>{return {id:val.id,orderId:i}})
    this.manageMediaService.reOrder(data).subscribe((val)=>{

    },(err)=>{

    })
  }

}
