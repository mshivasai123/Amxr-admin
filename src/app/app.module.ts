import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/modules/header/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './shared/interceptor/auth-interceptor.interceptor';
import { AuthService } from './shared/services/auth.service';
import { ErrorHandlerService } from './shared/services/error-handler.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    AuthService ,
    {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptorInterceptor,
       multi: true
    },
    { provide : ErrorHandler , useClass: ErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
