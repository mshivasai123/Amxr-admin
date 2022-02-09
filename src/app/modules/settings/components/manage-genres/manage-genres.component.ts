import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['genresName', 'showInApp', 'action'];
  dataSource = ELEMENT_DATA;

}
