import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-date-reorder',
  templateUrl: './date-reorder.component.html',
  styleUrls: ['./date-reorder.component.scss']
})
export class DateReorderComponent implements OnInit {
  selectedDate=""
  constructor( public dialogRef: MatDialogRef<DateReorderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.selectedDate = this.data.reOrderingDate;
  }

  closeModel(){
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close(this.selectedDate);
  }

}
