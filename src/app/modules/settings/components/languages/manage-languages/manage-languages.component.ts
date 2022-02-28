import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddLanguagesComponent } from '../add-languages/add-languages.component';

export interface PeriodicElement {
  languageName: string;
  showInAudio: string;
  showInSubtitles: string;
  status:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { languageName : 'English', showInAudio: "yes",showInSubtitles: "yes" , status: 'Active'},
  { languageName : 'Telugu', showInAudio: "no",showInSubtitles: "no", status: 'InActive' }
];


@Component({
  selector: 'app-manage-languages',
  templateUrl: './manage-languages.component.html',
  styleUrls: ['./manage-languages.component.scss']
})
export class ManageLanguagesComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['languageName', 'showInAudio','showInSubtitles','status', 'action'];
  dataSource = ELEMENT_DATA;


  addLanguage() {
    const dialogRef = this.dialog.open(AddLanguagesComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
  }

}