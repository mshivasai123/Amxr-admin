import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(public route : Router) { }

  handleError(error: Error | HttpErrorResponse | undefined){
    if(error instanceof HttpErrorResponse){
        if(error.status === 400){
          if (error.message === 'Invalid Token...') {
              localStorage.removeItem('token');
              this.route.navigateByUrl('/login');
          }  
        }
    }
  }
}
