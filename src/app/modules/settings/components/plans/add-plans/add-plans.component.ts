import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.scss']
})
export class AddPlansComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPlansComponent>
  ) { }

  ngOnInit(): void {
  }

  


}
