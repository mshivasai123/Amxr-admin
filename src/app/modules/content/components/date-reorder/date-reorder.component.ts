import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-date-reorder',
  templateUrl: './date-reorder.component.html',
  styleUrls: ['./date-reorder.component.scss']
})
export class DateReorderComponent implements OnInit {
  selectedDate=""
  constructor( public dialogRef: MatDialogRef<DateReorderComponent>,) { }

  ngOnInit(): void {
  }

  closeModel(){
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close(this.selectedDate);
  }

}
