import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddUsersComponent>
  ) { }

  ngOnInit(): void {
  }

}
