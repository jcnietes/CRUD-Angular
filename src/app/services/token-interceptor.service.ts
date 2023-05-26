import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = this.authService.getToken()
        if (token) {
            console.log("There is a token")
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        else {
            console.log("There is no token yet")
        }
        return next.handle(request).pipe(
            catchError((error: any) => {
                console.log(error)
                throw this.handleError(error);
            })
        );
    }

    private handleError(error: any): any {
        if (error instanceof HttpErrorResponse && error.status === 401) {
            console.log("HANDLE ERROR  " + error)

        }
        throw error;
    }
}

export const tokenInterceptorService = [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
];

