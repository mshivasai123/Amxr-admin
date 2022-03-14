import { Component, Inject, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-add-genres',
  templateUrl: './add-genres.component.html',
  styleUrls: ['./add-genres.component.scss']
})
export class AddGenresComponent implements OnInit {

  multiGenerForm : FormGroup;
  multyGener: FormArray;
  formData: any;
  title: string = 'Add Gener';
  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<AddGenresComponent>,
    public fb : FormBuilder,
    public generService : GenresService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.initForm();
    if(data){
    this.title = 'Edit Gener';
    this.editMode = true;
    this.multiGenerForm.controls['multyGener'].setValue([{name:data.genresName,showInApp: data?.showInApp === 'yes' ? true : false}]);
    }
  }

  ngOnInit(): void {
  }

  initForm(){
    this.multiGenerForm = this.fb.group({
      multyGener : this.fb.array([this.createGener()])
    })
  }

  addGener() {
    this.multyGener = this.multiGenerForm.get('multyGener') as FormArray;
    this.multyGener.push(this.createGener());
  }

  get generFormGroups () {
    this.formData = this.multiGenerForm.get('multyGener') as FormArray
    return this.multiGenerForm.get('multyGener') as FormArray
  }
  
  
  onSubmit(){
    console.log(this.multiGenerForm.getRawValue().multyGener);
    if(this.multiGenerForm.getRawValue().multyGener){
      const requestParams = this.multiGenerForm.getRawValue().multyGener
      this.dialogRef.close();
      this.generService.addMultyGener(requestParams).subscribe(response=>{
        console.log(response);
        if(response){
            this.dialogRef.close();
        }
      })
    }
  }

  editGener(){
    let editData = this.multiGenerForm.getRawValue().multyGener[0]
    editData.id = this.data.id
    this.generService.editGener(editData).subscribe(response =>{
      if(response){
        this.closeModel();
      }
    })
    this.closeModel();
  }

  createGener() {
    return this.fb.group({
      name: [''],
      showInApp: [true]
    })
  }

  closeModel(){
    this.dialogRef.close();
    this.editMode = false;
    this.title = 'Add Gener'
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.multiGenerForm.getRawValue().multyGener, event.previousIndex, event.currentIndex);
  }

}
