import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { ManageMediaComponent } from './components/manage-media/manage-media.component';
import { AddMediaComponent } from './components/add-media/add-media.component';
import { MediaInformationComponent } from './components/media-information/media-information.component';
import { FormsModule } from '@angular/forms';
import { MediaRightPanelComponent } from './components/media-right-panel/media-right-panel.component';
import { AddModuleComponent } from './components/add-module/add-module.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

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
    MediaInformationComponent,
    MediaRightPanelComponent,
    AddModuleComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule
  ]
})
export class ContentModule { }
