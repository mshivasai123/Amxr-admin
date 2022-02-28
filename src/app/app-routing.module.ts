import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path :'',
    redirectTo : '/login',
    pathMatch : "full"
  },
  {
    path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'subscribers', loadChildren: () => import('./modules/subscribers/subscribers.module').then(m => m.SubscribersModule)
  },
  {
    path: 'content', loadChildren: () => import('./modules/content/content.module').then(m => m.ContentModule)
  },
  {
    path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
