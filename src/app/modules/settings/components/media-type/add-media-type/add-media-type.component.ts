import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-media-type',
  templateUrl: './add-media-type.component.html',
  styleUrls: ['./add-media-type.component.scss']
})
export class AddMediaTypeComponent implements OnInit {
  mediaTypesList: any = [
    'mediaType1',
    'mediaType2',
    'mediaType3'
  ]
  constructor(
    public dialogRef: MatDialogRef<AddMediaTypeComponent>
  ) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.mediaTypesList, event.previousIndex, event.currentIndex);
  }

}
