import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-genres',
  templateUrl: './add-genres.component.html',
  styleUrls: ['./add-genres.component.scss']
})
export class AddGenresComponent implements OnInit {

  genresList: any = [
    'genre1',
    'genre2',
    'genre3'
  ]

  constructor(
    public dialogRef: MatDialogRef<AddGenresComponent>
  ) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.genresList, event.previousIndex, event.currentIndex);
  }

}
