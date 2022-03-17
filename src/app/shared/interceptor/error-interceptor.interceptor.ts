import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(public snackBar : MatSnackBar){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          if(error.status === 401 && request.url.endsWith('users/login')){
            this.snackBar.open('invalid login details', 'x', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 3000
              });
          }
          console.log(errorMsg);
          return throwError(() => new Error(errorMsg))
        //   return throwError(errorMsg);
        })
      )
  }
}