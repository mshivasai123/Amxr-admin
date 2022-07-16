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
  mediaData:any;
  completeGetData:any;
  isEdit:any;
  moduleId = ''
  showLoader:boolean = false;
  selectedModuleName =''
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMediaComponent>,
    public languageService: LanguagesService
  ) { }

  ngOnInit(): void {
    this.mediaDuplicate = this.data?.duplicate;
    console.log(this.data,"data")
    this.isEdit = this.data?.isEdit
    if(this.data?.isEdit){
      this.mediaData = this.data?.mediaData;
      if(!this.data?.duplicate)
      this.category = this.data?.mediaData?.languageId
      this.languageList = [this.data?.mediaData?.languageId]
      this.selectedLang = this.data?.mediaData?.language
    }
    this.selectedModuleName = this.data?.selectedModuleName
    this.completeGetData = this.data
    this.moduleId = this.data?.moduleId;
    this.getLanguage();
  }

  getLanguage() {
    this.showLoader = true;
    this.languageService.getLanguage().subscribe(response => {
      this.languages = response?.data || [];
      this.showLoader = false;
    },err=>{
      this.showLoader = false;
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

  closeModal(event:any){
   console.log(event)
   this.dialogRef.close(event)
  }

}
