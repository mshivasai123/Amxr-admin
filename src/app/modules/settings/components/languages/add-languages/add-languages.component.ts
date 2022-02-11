import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-languages',
  templateUrl: './add-languages.component.html',
  styleUrls: ['./add-languages.component.scss']
})
export class AddLanguagesComponent implements OnInit {

  languagesList: any = [
    'language1',
    'language2',
    'language3'
  ]

  constructor(
    public dialogRef: MatDialogRef<AddLanguagesComponent>
  ) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.languagesList, event.previousIndex, event.currentIndex);
  }

}
