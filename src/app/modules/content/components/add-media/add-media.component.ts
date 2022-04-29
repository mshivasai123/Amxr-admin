import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {

  languagesControl = new FormControl([]);
  languageList: string[] = []; 
  languages: string[] = ['Telugu','English', 'Hindi', 'Tamil', 'Kannada'];
  showFirstSteps = true;
  mainLanguage = '';
  category: any;
  mediaDuplicate: boolean;
  firstGroup:string;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMediaComponent>
  ) { }

  ngOnInit(): void {
    this.mediaDuplicate = this.data;
  }

  onCatRemoved(cat: string) {
    this.mainLanguage = cat;
    this.category = ''
  }

  selectedLanguage(){
    this.languageList.push(this.category);
    console.log(this.languageList)
  }

  goNextSteps() {
    this.showFirstSteps = false;
  }

}
