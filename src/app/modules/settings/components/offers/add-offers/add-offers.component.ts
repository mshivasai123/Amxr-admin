import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.scss']
})
export class AddOffersComponent implements OnInit {

  title: string = 'Add Offer';
  offerForm: FormGroup;
  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<AddOffersComponent>,
    public offersService: OffersService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
    console.log("data", data);
    if (data) {
      this.title = 'Edit Offer';
      this.editMode = true;
      this.offerForm.patchValue({ name: data.name, discountCode: data.discountCode, discountInPercentage: data.discountInPercentage, validityStartDateTime: data.validityStartDateTime, validityEndDateTime: data.validityEndDateTime });
    }
  }

  ngOnInit(): void {
  }

  initForm() {
    this.offerForm = this.fb.group({
      name: [''],
      discountCode: [''],
      discountInPercentage: [''],
      validityStartDateTime: [''],
      validityEndDateTime: ['']
    })
  }

  onSubmit(){
    console.log(this.offerForm.getRawValue());
    if(this.offerForm.getRawValue()){
      const requestParams = this.offerForm.getRawValue()
      this.offersService.addOffer(requestParams).subscribe(response=>{
        if(response){
          this.closeModel('submited');
        }
      })
    }
  }

  editOffer() {
    let editData = this.offerForm.getRawValue()
    editData.id = this.data.id
    this.offersService.editOffer(editData).subscribe(response => {
      if (response) {
        this.closeModel('submited');
      }
    })
  }

  closeModel(data?: any) {
    this.dialogRef.close(data);
    this.editMode = false;
    this.title = 'Add Offer'
  }

}
