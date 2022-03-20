import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageGenresComponent } from './components/genres/manage-genres/manage-genres.component';
import { ManageLanguagesComponent } from './components/languages/manage-languages/manage-languages.component';
import { ManagePlansComponent } from './components/plans/manage-plans/manage-plans.component';
import { ManageOffersComponent } from './components/offers/manage-offers/manage-offers.component';
import { ManageCertificationsComponent } from './components/certifications/manage-certifications/manage-certifications.component';
import { ManageTestUsersComponent } from './components/users/manage-test-users/manage-test-users.component';
import { MediaTypeComponent } from './components/media-type/media-type/media-type.component';
import { MediaProviderComponent } from './components/media-provider/media-provider/media-provider.component';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { AddGenresComponent } from './components/genres/add-genres/add-genres.component';
import { AddLanguagesComponent } from './components/languages/add-languages/add-languages.component';
import { AddPlansComponent } from './components/plans/add-plans/add-plans.component';
import { AddOffersComponent } from './components/offers/add-offers/add-offers.component';
import { AddCertificationsComponent } from './components/certifications/add-certifications/add-certifications.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { AddMediaTypeComponent } from './components/media-type/add-media-type/add-media-type.component';
import { AddMediaProviderComponent } from './components/media-provider/add-media-provider/add-media-provider.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
    RootComponent,
    AddGenresComponent,
    AddLanguagesComponent,
    AddPlansComponent,
    AddOffersComponent,
    AddCertificationsComponent,
    AddUsersComponent,
    AddMediaTypeComponent,
    AddMediaProviderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ],
  entryComponents : []
})
export class SettingsModule { }
