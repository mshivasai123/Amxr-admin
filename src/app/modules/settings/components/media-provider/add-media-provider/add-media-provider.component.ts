import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-media-provider',
  templateUrl: './add-media-provider.component.html',
  styleUrls: ['./add-media-provider.component.scss']
})
export class AddMediaProviderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddMediaProviderComponent>
  ) { }

  ngOnInit(): void {
  }

}
