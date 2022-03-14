import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-conformation',
  templateUrl: './conformation.component.html',
  styleUrls: ['./conformation.component.scss']
})
export class ConformationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConformationComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeModel(){
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close('submited');
  }

}
