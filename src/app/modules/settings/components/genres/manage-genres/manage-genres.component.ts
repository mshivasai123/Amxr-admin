import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';
import { AddGenresComponent } from '../add-genres/add-genres.component';
import { GenresService } from '../genres.service';

export interface PeriodicElement {
  id : number;
  genresName: string;
  showInApp: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id : 1 , genresName : 'Thriller', showInApp: "yes", status: 'Active' },
  { id : 2 ,genresName : 'Suspence', showInApp: "no", status: 'InActive' }
];



@Component({
  selector: 'app-manage-genres',
  templateUrl: './manage-genres.component.html',
  styleUrls: ['./manage-genres.component.scss']
})
export class ManageGenresComponent implements OnInit {

  selectedGener: any;

  constructor(
    public dialog: MatDialog,
    private generService : GenresService 
  ) { }

  ngOnInit(): void {
    this.getGener();
  }

  getGener(){
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

  deleteGener() {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '500px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.generService.deleteGener(this.selectedGener).subscribe(response=>{
          if(response){
            console.log(response);
          }
        })
      }
    });
  
  }

  selectGener(data:any){
    this.selectedGener = data;
  }

  editGener(){
    console.log(this.selectedGener);
    const dialogRef = this.dialog.open(AddGenresComponent, {
      width: '1000px',
      panelClass: ['edit-modal'],
      data: this.selectedGener,
    });
  }

}
