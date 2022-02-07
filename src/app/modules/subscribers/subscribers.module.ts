import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';

const routes: Routes = [
  {
    path: '', component: RootComponent
  }
]

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)

  ]
})
export class SubscribersModule { }
