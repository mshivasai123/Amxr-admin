import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

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
    path: 'subscribers', canActivate: [AuthGuard] , loadChildren: () => import('./modules/subscribers/subscribers.module').then(m => m.SubscribersModule)
  },
  {
    path: 'content', canActivate: [AuthGuard] , loadChildren: () => import('./modules/content/content.module').then(m => m.ContentModule)
  },
  {
    path: 'settings', canActivate: [AuthGuard] , loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path :'**',
    redirectTo : '/login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
