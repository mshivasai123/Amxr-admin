import { Component, Inject, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MediatypeService } from '../mediatype.service';

@Component({
  selector: 'app-add-media-type',
  templateUrl: './add-media-type.component.html',
  styleUrls: ['./add-media-type.component.scss']
})
export class AddMediaTypeComponent implements OnInit {

  multiTypeForm : FormGroup;
  multyType: FormArray;
  formData: any;
  title: string = 'Add Media Type';
  editMode = false;
  constructor(
    public dialogRef: MatDialogRef<AddMediaTypeComponent>,
    public fb : FormBuilder,
    public mediatypeService : MediatypeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.initForm();  
    if(data){
    this.title = 'Edit Media Type';
    this.editMode = true;
    this.multiTypeForm.controls['multyType'].setValue([{name:data.name,showInApp: data?.showInApp}]);
    }
  }

  ngOnInit(): void {
  }

  initForm(){
    this.multiTypeForm = this.fb.group({
      multyType : this.fb.array([this.createType()])
    })
  }

  addType() {
    this.multyType = this.multiTypeForm.get('multyType') as FormArray;
    this.multyType.push(this.createType());
  }

  get typeFormGroups () {
    this.formData = this.multiTypeForm.get('multyType') as FormArray
    return this.multiTypeForm.get('multyType') as FormArray
  }
  
  
  onSubmit(){
    console.log(this.multiTypeForm.getRawValue().multyType);
    if(this.multiTypeForm.getRawValue().multyType){
      const requestParams = this.multiTypeForm.getRawValue().multyType
      this.mediatypeService.addMultyType(requestParams).subscribe(response=>{
        if(response){
          this.closeModel('submited');
        }
      })
    }
  }

  editType(){
    let editData = this.multiTypeForm.getRawValue().multyType[0]
    editData.id = this.data.id
    this.mediatypeService.editType(editData).subscribe(response =>{
      if(response){
        this.closeModel('submited');
      }
    })
  }

  createType() {
    return this.fb.group({
      name: [''],
      showInApp: [false]
    })
  }

  closeModel(data?:any){
    this.dialogRef.close(data);
    this.editMode = false;
    this.title = 'Add Type'
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.multiTypeForm.getRawValue().multyType, event.previousIndex, event.currentIndex);
  }

}
