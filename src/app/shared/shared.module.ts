import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConformationComponent } from './model/conformation/conformation.component';


@NgModule({
  declarations: [
    ConformationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConformationComponent
  ],
  entryComponents: [
    ConformationComponent
  ]
})
export class SharedModule { }
