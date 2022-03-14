import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';
import { AddLanguagesComponent } from '../add-languages/add-languages.component';
import { LanguagesService } from '../languages.service';

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

  selectedLanguage : any;

  constructor(
    public dialog: MatDialog,
    public languageService : LanguagesService
  ) { }

  ngOnInit(): void {
    this.getLanguage();
  }

  getLanguage(){
    this.languageService.getLanguage().subscribe(response =>{
      this.dataSource = response?.data
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
            console.log(response);
          }
        })
      }
    });
  }

  selectLanguage(data:any){
    this.selectedLanguage = data;
  }

  editLanguage(){
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
