import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlansService } from '../plans.service';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.scss']
})
export class AddPlansComponent implements OnInit {

    title : string = 'Add Sub.Plan';
    editMode = false;
    planForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPlansComponent>,
    public plansService : PlansService,
    public fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.initForm();
    console.log("data",data);
    if(data){
    this.title = 'Edit Sub.Plan';
    this.editMode = true;
    console.log(this.planForm)
    this.planForm.patchValue({name:data.name,actualCost: data?.actualCost,discountInPercentage : data.discountInPercentage,days: data?.days});
    }
  }

  ngOnInit(): void {
  }

  initForm(){
    this.planForm = this.fb.group({
      name: [''],
      days: [''],
      actualCost: [''],
      currencyType: [''],
      discountInPercentage: ['']
    })
  }

  onSubmit(){
    console.log(this.planForm.getRawValue());
    if(this.planForm.getRawValue()){
      const requestParams = this.planForm.getRawValue()
      this.plansService.addPlan(requestParams).subscribe(response=>{
        if(response){
          this.closeModel('submited');
        }
      })
    }
  }

  closeModel(data?:any){
    this.dialogRef.close(data);
    this.editMode = false;
    this.title = 'Add Sub.Plan'
  }

  editPlan(){
    let editData = this.planForm.getRawValue()
    editData.id = this.data.id
    this.plansService.editPlan(editData).subscribe(response =>{
      if(response){
        this.closeModel('submited');
      }
    })
  }

}
