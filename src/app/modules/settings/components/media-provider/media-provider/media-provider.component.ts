import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMediaProviderComponent } from '../add-media-provider/add-media-provider.component';

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
  { logo: "", name :'Prasad',email : 'email@email.com', phone: '678484039343',loginToken: 'AS22334DF34',contentCount: 234, totalViews: 343452,approxCost: 345445, status : 'active', date: 'Jan 12th 2022' },
  { logo: "", name :'Prasad',email : 'email@email.com', phone: '678484039343',loginToken: 'AS22334DF34',contentCount: 234, totalViews: 343452,approxCost: 345445, status : 'inactive', date: 'Jan 12th 2022' }
];


@Component({
  selector: 'app-media-provider',
  templateUrl: './media-provider.component.html',
  styleUrls: ['./media-provider.component.scss']
})
export class MediaProviderComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['logo','name','email','phone','loginToken','contentCount','totalViews','approxCost','status','date', 'action'];
  dataSource = ELEMENT_DATA;

  addProvider() {
    const dialogRef = this.dialog.open(AddMediaProviderComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
  }

}
