import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

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
                    Authoriztion: `Bearer ${localStorage.getItem("token")}`
                }
            });
            cloned = request.clone({
                headers: cloned.headers.set('Content-Type', 'application/json')
            })
            return next.handle(cloned).pipe(
                catchError(async (error: HttpErrorResponse) => {
                    return throwError(error);
                })
            ) as any;
        } else {
            return next.handle(request);
        }
    }   
}
