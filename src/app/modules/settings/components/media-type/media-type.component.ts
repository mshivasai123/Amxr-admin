import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  mediaType: string;
  status : string;
  date : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { mediaType: "2D", status : 'active', date: 'Jan 12th 2022' },
  { mediaType: "3D-TB", status : 'inactive', date: 'Jan 12th 2022' }
];


@Component({
  selector: 'app-media-type',
  templateUrl: './media-type.component.html',
  styleUrls: ['./media-type.component.scss']
})
export class MediaTypeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['mediaType','status','date', 'action'];
  dataSource = ELEMENT_DATA;


}
