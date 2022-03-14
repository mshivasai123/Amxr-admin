import { Component, Inject, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LanguagesService } from '../languages.service';

@Component({
  selector: 'app-add-languages',
  templateUrl: './add-languages.component.html',
  styleUrls: ['./add-languages.component.scss']
})
export class AddLanguagesComponent implements OnInit {

  multiLanguageForm : FormGroup;
  multyLanguage: FormArray;
  formData: any;
  title: string = 'Add Language';
  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<AddLanguagesComponent>,
    public fb : FormBuilder,
    public languageService : LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.initForm();
    if(data){
    this.title = 'Edit Language';
    this.editMode = true;
    this.multiLanguageForm.controls['multyLanguage'].setValue([{name:data.languageName,showInAudio: data?.showInAudio === 'yes' ? true : false,showInSubtitles: data?.showInSubtitles === 'yes' ? true : false}]);
    }
  }

  ngOnInit(): void {
  }

  initForm(){
    this.multiLanguageForm = this.fb.group({
      multyLanguage : this.fb.array([this.createLanguage()])
    })
  }

  addLanguage() {
    this.multyLanguage = this.multiLanguageForm.get('multyLanguage') as FormArray;
    this.multyLanguage.push(this.createLanguage());
  }

  get languageFormGroups () {
    this.formData = this.multiLanguageForm.get('multyLanguage') as FormArray
    return this.multiLanguageForm.get('multyLanguage') as FormArray
  }


  onSubmit(){
    console.log(this.multiLanguageForm.getRawValue().multyLanguage);
    if(this.multiLanguageForm.getRawValue().multyLanguage){
      const requestParams = this.multiLanguageForm.getRawValue().multyLanguage
      this.dialogRef.close();
      this.languageService.addMultyLanguage(requestParams).subscribe(response=>{
        console.log(response);
        if(response){
            this.dialogRef.close();
        }
      })
    }
  }

  editLanguage(){
    let editData = this.multiLanguageForm.getRawValue().multyLanguage[0]
    editData.id = this.data.id
    this.languageService.editLanguage(editData).subscribe(response =>{
      if(response){
        this.closeModel();
      }
    })
    this.closeModel();
  }

  createLanguage() {
    return this.fb.group({
      name: [''],
      showInAudio: [false],
      showInSubtitles: [false]
    })
  }

  closeModel(){
    this.dialogRef.close();
    this.editMode = false;
    this.title = 'Add Language'
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.multiLanguageForm.getRawValue().multyLanguage, event.previousIndex, event.currentIndex);
  }

}
