import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  image: number;
  moduleName: string;
  moduleType: string;
  updatedDate: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { image: 1, moduleName: 'Movies', moduleType: "Single", updatedDate: '6th Jan 2021', status: "Active / Inactive" },
  { image: 2, moduleName: 'Series', moduleType: "Sequence", updatedDate: '6th Jan 2021', status: "Active / Inactive" }
];

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  displayedColumns: string[] = ['image', 'moduleName', 'moduleType', 'updatedDate', 'status', 'action'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
