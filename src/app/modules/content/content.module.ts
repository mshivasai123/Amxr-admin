import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { ManageMediaComponent } from './components/manage-media/manage-media.component';
import { AddMediaComponent } from './components/add-media/add-media.component';
import { MediaInformationComponent } from './components/media-information/media-information.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: RootComponent
  },
  {
    path: 'manage-media', 
    component: ManageMediaComponent
  },
  {
    path: 'add-media', 
    component: AddMediaComponent
  }
]

@NgModule({
  declarations: [
    RootComponent,
    ManageMediaComponent,
    AddMediaComponent,
    MediaInformationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ContentModule { }
