import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { catchError, map , tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { mapKeys } from "lodash";

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
    isRefreshingToken = false;
    constructor(private route: Router, private authService: AuthService) { }
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (this.authService.getToken() && !request.url.endsWith('users/login')) {
            
            let cloned = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            
            // cloned = request.clone({
            //     headers: cloned.headers.set('Boundary', 'MyBoundary')
            // })
            
            return next.handle(cloned).pipe(
                tap((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                    if(event?.body.success === 0 && event?.body.message === 'Invalid Token...'){
                        localStorage.clear()
                        this.route.navigateByUrl('/login')
                       }
                  }
                })
              );;
        } else {
            return next.handle(request).pipe(
                catchError(async (error: HttpErrorResponse) => {
                    return throwError(error);
                })
            ) as any;
        }
    }   
}
