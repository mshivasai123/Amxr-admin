import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';
import { AddOffersComponent } from '../add-offers/add-offers.component';
import { OffersService } from '../offers.service';

export interface PeriodicElement {
  offerName: string;
  offerCode: string;
  offerPercentage : string;
  offerStatus : string;
  offerValidity : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { offerName : 'Refer', offerCode: "CO66734",offerPercentage: "10%", offerStatus : 'Active', offerValidity: 'July 12th 2022' },
  { offerName : 'Refer', offerCode: "CO66734",offerPercentage: "10%", offerStatus : 'InActive', offerValidity: 'July 12th 2022' }
];


@Component({
  selector: 'app-manage-offers',
  templateUrl: './manage-offers.component.html',
  styleUrls: ['./manage-offers.component.scss']
})
export class ManageOffersComponent implements OnInit {
  
  selectedOffer: any;
  statusKey: any;
  searchedKeyword: string;

  constructor(
    public dialog: MatDialog,
    public offersService : OffersService,
  ) { }

  ngOnInit(): void {
    this.getOffers();
  }

  getDate(date:Date){
    let newDate = new Date(date);
    return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
  }

  startAndEndDate(start:Date,end:Date){
    let startDate = new Date(start);
    let endDate = new Date(end);
    return `${startDate.getDate()}-${startDate.getMonth()}-${startDate.getFullYear()} - ${endDate.getDate()}-${endDate.getMonth()}-${endDate.getFullYear()}`
  }

  getOffers(){
    this.offersService.getOffer().subscribe(response =>{
      this.dataSource = response?.data;
      this.dataSource.forEach((element:any,i:number) => {
        this.dataSource[i].status = element?.status === true ? 'active' : 'in-active'
      });
    })
  }

  displayedColumns: string[] = ['name', 'discountCode','discountInPercentage','validityEndDateTime','status', 'action'];
  dataSource : any;

  addOffer() {
    const dialogRef = this.dialog.open(AddOffersComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getOffers()
      }
    });
  }

  selectOffer(data:any){
    this.statusKey = data.status == "active" ? "in-active" : "active"
    this.selectedOffer = data;
  }

  editOffer(data?:string){
    if(data == 'status'){
      this.selectedOffer.status = this.selectedOffer.status == true ? "active" : "in-active";
      let request = {
        id : this.selectedOffer.id,
        status : this.statusKey == "active" ? true : false
      }
      this.offersService.editOffer(request,'status').subscribe(response =>{
        if(response){
          this.getOffers();
        }
      })
    }else {
      const dialogRef = this.dialog.open(AddOffersComponent, {
        width: '1000px',
        panelClass: ['edit-modal'],
        data: this.selectedOffer,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'submited'){
          this.getOffers()
        }
      });
    }
  }

  deleteOffer() {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '500px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.offersService.deleteOffer(this.selectedOffer).subscribe(response=>{
          if(response){
            this.getOffers()
          }
        })
      }
    });
  
  }

}
