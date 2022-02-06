import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared-modules/shared/shared.module';

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
    SharedModule,
    RouterModule.forChild(routes)

  ]
})
export class SubscribersModule { }
