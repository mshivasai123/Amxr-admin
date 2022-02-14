import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {

  languagesControl = new FormControl([]);
  languages: string[] = ['Telugu','English', 'Hindi', 'Tamil', 'Kannada'];
  showFirstSteps = true;
  mainLanguage = '';
  
  constructor(
    public dialogRef: MatDialogRef<AddMediaComponent>
  ) { }

  ngOnInit(): void {
  }

  onCatRemoved(cat: string) {
    const categories = this.languagesControl.value as string[];
    this.removeFirst(categories, cat);
    this.languagesControl.setValue(categories); 
  }

  private removeFirst(array: any, toRemove: any): void {

    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  goNextSteps() {
    this.showFirstSteps = false;
  }

}
