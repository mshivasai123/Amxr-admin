import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { ManageMediaComponent } from './components/manage-media/manage-media.component';

const routes: Routes = [
  {
    path: '', component: RootComponent
  },
  {
    path: 'manage-media', 
    component: ManageMediaComponent
  }
]

@NgModule({
  declarations: [
    RootComponent,
    ManageMediaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ContentModule { }
