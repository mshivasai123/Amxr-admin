import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/modules/header/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './shared/interceptor/auth-interceptor.interceptor';
import { AuthService } from './shared/services/auth.service';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpErrorInterceptor } from './shared/interceptor/error-interceptor.interceptor';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './shared/services/auth.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderInterceptor } from './shared/interceptor/loader-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthService , AuthGuard,
    {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptorInterceptor,
       multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
   },
    { provide : ErrorHandler , useClass: ErrorHandlerService}
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
