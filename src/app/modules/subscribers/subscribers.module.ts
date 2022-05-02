import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { AddSubscribersComponent } from './add-subscribers/add-subscribers.component';

const routes: Routes = [
  {
    path: '', component: RootComponent
  }
]

@NgModule({
  declarations: [
    RootComponent,
    AddSubscribersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)

  ]
})
export class SubscribersModule { }
