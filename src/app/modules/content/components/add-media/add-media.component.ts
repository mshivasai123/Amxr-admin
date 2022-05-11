import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LanguagesService } from 'src/app/modules/settings/components/languages/languages.service';
import { MediaInformationComponent } from '../media-information/media-information.component';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {
  @ViewChild(MediaInformationComponent) mediaComp: MediaInformationComponent;
  languagesControl = new FormControl([]);
  languageList: string[] = []; 
  languages: any = [];
  selectedLang:any;
  showFirstSteps = true;
  mainLanguage = '';
  category: any;
  mediaDuplicate: boolean;
  firstGroup:string;
  moduleId = ''
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMediaComponent>,
    public languageService: LanguagesService
  ) { }

  ngOnInit(): void {
    this.mediaDuplicate = this.data?.duplicate;
    this.moduleId = this.data?.moduleId;
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.getLanguage().subscribe(response => {
      this.languages = response?.data || [];
    })
  }

  // onCatRemoved(cat: string) {
  //   this.mainLanguage = cat;
  //   this.category = ''
  // }

  selectedLanguage(){
    this.languageList.push(this.category);
    this.selectedLang = this.languages.find((val: any)=> val.id == this.category)

    console.log(this.languageList)
  }

  goNextSteps() {
    this.showFirstSteps = false;
  }

  saveData() {
    this.mediaComp.saveData()
  }

}
