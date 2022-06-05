import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';
import { AddLanguagesComponent } from '../add-languages/add-languages.component';
import { LanguagesService } from '../languages.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
export interface PeriodicElement {
  id : number;
  languageName: string;
  showInAudio: string;
  showInSubtitles: string;
  status:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id : 1 , languageName : 'English', showInAudio: "yes",showInSubtitles: "yes" , status: 'Active'},
  { id : 2 , languageName : 'Telugu', showInAudio: "no",showInSubtitles: "no", status: 'InActive' }
];


@Component({
  selector: 'app-manage-languages',
  templateUrl: './manage-languages.component.html',
  styleUrls: ['./manage-languages.component.scss']
})
export class ManageLanguagesComponent implements OnInit {
  @ViewChild('table') table: MatTable<any>;
  enableReorder=false;
  selectedLanguage : any;
  searchedKeyword: string;
  statusKey: any;

  constructor(
    public dialog: MatDialog,
    public languageService : LanguagesService
  ) { }

  ngOnInit(): void {
    this.getLanguage();
  }

  getLanguage(){
    this.languageService.getLanguage().subscribe(response =>{
      this.dataSource = response?.data;
      this.dataSource.sort((a:any,b:any)=> {return a.orderId - b.orderId});
      this.dataSource.forEach((element:any,i:number) => {
        this.dataSource[i].showInAudio = element?.showInAudio === true ? 'yes' : 'no',
        this.dataSource[i].showInSubtitles = element?.showInSubtitles === true ? 'yes' : 'no', 
        this.dataSource[i].status = element?.status === true ? 'active' : 'in-active'
      });
    })
  }

  displayedColumns: string[] = ['name', 'showInAudio','showInSubtitles','status', 'action'];
  dataSource = ELEMENT_DATA;


  addLanguage() {
    const dialogRef = this.dialog.open(AddLanguagesComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getLanguage()
      }
    });
  }

  deleteLanguage() {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '500px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.languageService.deleteLanguage(this.selectedLanguage).subscribe(response=>{
          if(response){
            this.getLanguage()
          }
        })
      }
    });
  }

  selectLanguage(data:any){
    this.statusKey = data.status == "active" ? "in-active" : "active"
    this.selectedLanguage = data;
  }

  editLanguage(data?:string){
    if(data == 'status'){
      this.selectedLanguage.status = this.selectedLanguage.status == true ? "active" : "in-active";
      let request = {
        id : this.selectedLanguage.id,
        status : this.statusKey == "active" ? true : false
      }
      this.languageService.editLanguage(request,'status').subscribe(response =>{
        if(response){
          this.getLanguage()
        }
      })
    } else {
    const dialogRef = this.dialog.open(AddLanguagesComponent, {
      width: '1000px',
      panelClass: ['edit-modal'],
      data: this.selectedLanguage,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getLanguage()
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
    this.languageService.reOrder(data).subscribe((val)=>{

    },(err)=>{

    })
  }

}
