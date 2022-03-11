import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddGenresComponent } from '../add-genres/add-genres.component';
import { GenresService } from '../genres.service';

export interface PeriodicElement {
  genresName: string;
  showInApp: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { genresName : 'Thriller', showInApp: "yes", status: 'Active' },
  { genresName : 'Suspence', showInApp: "no", status: 'InActive' }
];


@Component({
  selector: 'app-manage-genres',
  templateUrl: './manage-genres.component.html',
  styleUrls: ['./manage-genres.component.scss']
})
export class ManageGenresComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private generService : GenresService 
  ) { }

  ngOnInit(): void {
    this.generService.getGener().subscribe(response =>{
      this.dataSource = ELEMENT_DATA 
      // this.dataSource = response  
      console.log("getGener",this.dataSource);
    })
  }
  
  displayedColumns: string[] = ['genresName', 'showInApp','status', 'action'];
  dataSource = ELEMENT_DATA;

  addGener() {
    const dialogRef = this.dialog.open(AddGenresComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
  }

}
