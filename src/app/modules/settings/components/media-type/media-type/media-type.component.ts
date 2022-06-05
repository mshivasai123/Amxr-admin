import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';
import { AddMediaTypeComponent } from '../add-media-type/add-media-type.component';
import { MediatypeService } from '../mediatype.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';

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
  @ViewChild('table') table: MatTable<any>;
  enableReorder=false;
  selectedType : any;
  searchedKeyword: string;
  statusKey: any;

  constructor(
    public dialog: MatDialog,
    public mediatypeService : MediatypeService
  ) { }

  ngOnInit(): void {
    this.getType();
  }

  getDate(date:Date){
    let newDate = new Date(date);
    return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
  }

  startAndEndDate(start:Date,end:Date){
    let startDate = new Date(start);
    let endDate = new Date(end);
    return `${startDate.getDate()}-${startDate.getMonth()}-${startDate.getFullYear()} - ${endDate.getDate()}-${endDate.getMonth()}-${endDate.getFullYear()}`
  }

  getType(){
    this.mediatypeService.getType().subscribe(response =>{
      this.dataSource = response?.data;
      this.dataSource.sort((a:any,b:any)=> {return a.orderId - b.orderId});
      this.dataSource.forEach((element:any,i:number) => {
        this.dataSource[i].status = element?.status === true ? 'active' : 'in-active'
      });
    })
  }

  displayedColumns: string[] = ['name', 'createdAt','status', 'action'];
  dataSource : any;

  addType() {
    const dialogRef = this.dialog.open(AddMediaTypeComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('submited',result)
      if(result == 'submited'){
        this.getType()
      }
    });
  }

  deleteType() {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '500px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.mediatypeService.deleteType(this.selectedType).subscribe(response=>{
          if(response){
            this.getType()
          }
        })
      }
    });
  
  }

  selectType(data:any){
    this.statusKey = data.status == "active" ? "in-active" : "active"
    this.selectedType = data;
  }

  editType(data?:any){
    if(data == 'status'){
      this.selectedType.status = this.selectedType.status == true ? "active" : "in-active";
      let request = {
        id : this.selectedType.id,
        status : this.statusKey == "active" ? true : false
      }
      this.mediatypeService.editType(request,'status').subscribe(response =>{
        if(response){
          this.getType()
        }
      })
    } else {
    const dialogRef = this.dialog.open(AddMediaTypeComponent, {
      width: '1000px',
      panelClass: ['edit-modal'],
      data: this.selectedType,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getType()
      }
    });
   }
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
    this.mediatypeService.reOrder(data).subscribe((val)=>{

    },(err)=>{

    })
  }

}
