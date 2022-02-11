import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.scss']
})
export class AddOffersComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddOffersComponent>
  ) { }

  ngOnInit(): void {
  }

}
