import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageGenresComponent } from './components/manage-genres/manage-genres.component';
import { ManageLanguagesComponent } from './components/manage-languages/manage-languages.component';
import { ManagePlansComponent } from './components/manage-plans/manage-plans.component';
import { ManageOffersComponent } from './components/manage-offers/manage-offers.component';
import { ManageCertificationsComponent } from './components/manage-certifications/manage-certifications.component';
import { ManageTestUsersComponent } from './components/manage-test-users/manage-test-users.component';
import { MediaTypeComponent } from './components/media-type/media-type.component';
import { MediaProviderComponent } from './components/media-provider/media-provider.component';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { MaterialModule } from 'src/app/shared/material.module';

const routes: Routes = [
  {
    path : '',
    component : RootComponent,
    children : [
      {
        path : 'genres',
        component : ManageGenresComponent
      },
      {
        path : 'languages',
        component : ManageLanguagesComponent
      },
      {
        path : 'plans',
        component : ManagePlansComponent
      },
      {
        path : 'offers',
        component : ManageOffersComponent
      },
      {
        path : 'certifications',
        component : ManageCertificationsComponent
      },
      {
        path : 'test-users',
        component : ManageTestUsersComponent
      },
      {
        path : 'media-type',
        component : MediaTypeComponent
      },
      {
        path : 'media-provider',
        component : MediaProviderComponent
      }
    ]
  }
]


@NgModule({
  declarations: [
    ManageGenresComponent,
    ManageLanguagesComponent,
    ManagePlansComponent,
    ManageOffersComponent,
    ManageCertificationsComponent,
    ManageTestUsersComponent,
    MediaTypeComponent,
    MediaProviderComponent,
    RootComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
