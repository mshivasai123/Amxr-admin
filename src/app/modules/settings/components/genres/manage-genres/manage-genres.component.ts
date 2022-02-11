import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddGenresComponent } from '../add-genres/add-genres.component';

export interface PeriodicElement {
  genresName: string;
  showInApp: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { genresName : 'Thriller', showInApp: "yes" },
  { genresName : 'Suspence', showInApp: "no" }
];


@Component({
  selector: 'app-manage-genres',
  templateUrl: './manage-genres.component.html',
  styleUrls: ['./manage-genres.component.scss']
})
export class ManageGenresComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['genresName', 'showInApp', 'action'];
  dataSource = ELEMENT_DATA;

  addGener() {
    const dialogRef = this.dialog.open(AddGenresComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
  }

}
