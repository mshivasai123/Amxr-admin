import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';
import { AddGenresComponent } from '../../genres/add-genres/add-genres.component';
import { AddPlansComponent } from '../add-plans/add-plans.component';
import { PlansService } from '../plans.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  cost: number;
  offerPercentage : string;
  status : string;
  offerValidity : string;
  date:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name : 'English', cost: 12,offerPercentage: "10%", status : 'Active', offerValidity: '30 days',date : 'Jan 12th 2022' },
  { name : 'Telugu', cost: 12,offerPercentage: "10%", status : 'InActive', offerValidity: '30 days',date : 'Jan 12th 2022' }
];


@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.scss']
})
export class ManagePlansComponent implements OnInit {
  @ViewChild('table') table: MatTable<any>;
  enableReorder=false;
  selectedPlan: any;
  statusKey: any;
  searchedKeyword: string;

  constructor(
    public dialog: MatDialog,
    public plansService : PlansService
  ) { }

  ngOnInit(): void {
    this.getPlan();
  }

  getPlan(){
    this.plansService.getPlan().subscribe(response =>{
      this.dataSource = response?.data;
      this.dataSource.sort((a:any,b:any)=> {return a.orderId - b.orderId});
      this.dataSource.forEach((element:any,i:number) => {
        this.dataSource[i].status = element?.status === true ? 'active' : 'in-active'
      });
    })
  }

  displayedColumns: string[] = ['name', 'actualCost','finalCost','discountInPercentage','offerValidity','createdAt','status', 'action'];
  dataSource : any;

  addPlans() {
    const dialogRef = this.dialog.open(AddPlansComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getPlan()
      }
    });
  }

  getDate(date:Date){
    let newDate = new Date(date);
    return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}-${newDate.getHours()}:${newDate.getMinutes()}`
  }

  startAndEndDate(start:Date,end:Date){
    let startDate = new Date(start);
    let endDate = new Date(end);
    return `${startDate.getDate()}-${startDate.getMonth()}-${startDate.getFullYear()} - ${endDate.getDate()}-${endDate.getMonth()}-${endDate.getFullYear()}`
  }

  selectPlan(data:any){
    this.statusKey = data.status == "active" ? "in-active" : "active"
    this.selectedPlan = data;
  }

  editPlan(data?:string){
    if(data == 'status'){
      this.selectedPlan.status = this.selectedPlan.status == true ? "active" : "in-active";
      let request = {
        id : this.selectedPlan.id,
        status : this.statusKey == "active" ? true : false
      }
      this.plansService.editPlan(request,'status').subscribe(response =>{
        if(response){
          this.getPlan();
        }
      })
    }else {
      const dialogRef = this.dialog.open(AddPlansComponent, {
        width: '1000px',
        panelClass: ['edit-modal'],
        data: this.selectedPlan,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'submited'){
          this.getPlan()
        }
      });
    }
  }

  deletePlan() {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '500px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.plansService.deletePlan(this.selectedPlan).subscribe(response=>{
          if(response){
            this.getPlan()
          }
        })
      }
    });
  
  }

  dropTable(event: CdkDragDrop<any>) {
    if(this.enableReorder){
      const prevIndex = this.dataSource.findIndex((d:any) => d === event.item.data);
      moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
      this.table.renderRows();
    }
  }

  saveOrder(){
    let data = this.dataSource.map((val:any,i:number)=>{return {id:val.id,orderId:i}})
    this.plansService.reOrder(data).subscribe((val:any)=>{

    },(err:any)=>{

    })
  }

}
