import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ConformationComponent } from 'src/app/shared/model/conformation/conformation.component';
import { environment } from 'src/environments/environment';
import { AddMediaProviderComponent } from '../add-media-provider/add-media-provider.component';
import { ProviderService } from '../provider.service';

export interface PeriodicElement {
  logo: string;
  name: string;
  email: string;
  phone: string;
  loginToken: string;
  contentCount: number;
  totalViews: number;
  approxCost: number;
  status : string;
  date : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { logo: "", name :'Prasad',email : 'email@email.com', phone: '678484039343',loginToken: 'AS22334DF34',contentCount: 234, totalViews: 343452,approxCost: 345445, status : 'Active', date: 'Jan 12th 2022' },
  { logo: "", name :'Prasad',email : 'email@email.com', phone: '678484039343',loginToken: 'AS22334DF34',contentCount: 234, totalViews: 343452,approxCost: 345445, status : 'InActive', date: 'Jan 12th 2022' }
];


@Component({
  selector: 'app-media-provider',
  templateUrl: './media-provider.component.html',
  styleUrls: ['./media-provider.component.scss']
})
export class MediaProviderComponent implements OnInit {

  selectedProvider : any;
  baseUrl = environment.basicUrl;

  constructor(
    public dialog: MatDialog,
    public providerService : ProviderService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.getProviders();
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

  getProviders(){
    this.providerService.getProvider().subscribe(response =>{
      this.dataSource = response?.data;
      this.dataSource.forEach((element:any,i:number) => {
        this.dataSource[i].status = element?.status === true ? 'active' : 'in-active'
      });
    })
  }

  displayedColumns: string[] = ['logo','mediaProviderName','email','contact','loginToken','contentCount','totalViews','approxCost','contentValidityStartDate','status', 'action'];
  dataSource : any;

  addProvider() {
    const dialogRef = this.dialog.open(AddMediaProviderComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getProviders()
      }
    });
  }

  selectProvider(data:any){
    this.selectedProvider = data;
  }

  editProvider(){
    const dialogRef = this.dialog.open(AddMediaProviderComponent, {
      width: '1000px',
      panelClass: ['edit-modal'],
      data: this.selectedProvider,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.getProviders()
      }
    });
  }

  deleteProvider() {
    const dialogRef = this.dialog.open(ConformationComponent, {
      width: '500px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        this.providerService.deleteProvider(this.selectedProvider).subscribe(response=>{
          if(response){
            this.getProviders()
          }
        })
      }
    });
  
  }

}
