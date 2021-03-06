import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddSubscribersComponent } from '../../add-subscribers/add-subscribers.component';

export interface PeriodicElement {
  image: number;
  userName: string;
  userType: string;
  userId: string;
  email: string;
  phone: string;
  plan: string,
  expiry: string;
  date: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { image: 1, userName: 'Shiva', userType: 'Test', userId:'123456',  email: "test@gmail.com", phone: '9992223331', plan: "6 months", expiry: '6th Jan 2022', date: "6th Jan 2022", status: "completed" },
  { image: 2, userName: 'Shiva', userType: 'Subscriber', userId:'123355',email: "test@gmail.com", phone: '9992223331', plan: "6 months", expiry: '6th Jan 2022', date: "6th Jan 2022", status: "Active / Expried" },
  { image: 3, userName: 'Sai', userType: 'Test',userId:'123633', email: "test@gmail.com", phone: '9992223331', plan: "6 months", expiry: '6th Jan 2022', date: "6th Jan 2022", status: "completed" }
];

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  displayedColumns: string[] = ['select', 'image','userId', 'userName','userType', 'email', 'phone', 'plan', 'expiry', 'date', 'status', 'action'];
  dataSource = ELEMENT_DATA;
  selection = new SelectionModel<PeriodicElement>(true, []);
  // contextMenuPosition = { x: '0px', y: '0px' };
  // @ViewChild(MatMenuTrigger)
  // contextMenu: MatMenuTrigger;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  addSubscriber() {
    const dialogRef = this.dialog.open(AddSubscribersComponent, {
      width: '1000px',
      panelClass: ['add-modal']
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'submited'){
        console.log('submited')
      }
    });
  }



}
