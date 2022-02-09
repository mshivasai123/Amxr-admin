import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  languageName: string;
  showInAudio: string;
  showInSubtitles: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { languageName : 'English', showInAudio: "yes",showInSubtitles: "yes" },
  { languageName : 'Telugu', showInAudio: "no",showInSubtitles: "no" }
];


@Component({
  selector: 'app-manage-languages',
  templateUrl: './manage-languages.component.html',
  styleUrls: ['./manage-languages.component.scss']
})
export class ManageLanguagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['languageName', 'showInAudio','showInSubtitles', 'action'];
  dataSource = ELEMENT_DATA;

}
