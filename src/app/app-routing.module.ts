import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path :'',
    redirectTo : '/subscribers',
    pathMatch : "full"
  },
  {
    path: 'subscribers', loadChildren: () => import('./modules/subscribers/subscribers.module').then(m => m.SubscribersModule)
  },
  {
    path: 'content', loadChildren: () => import('./modules/content/content.module').then(m => m.ContentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
