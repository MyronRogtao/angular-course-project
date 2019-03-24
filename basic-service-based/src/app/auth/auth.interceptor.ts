import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { StoreageService } from '../shared/storeage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storageService: StoreageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            headers: req.headers.set('some-header', 'some-header-value'),
            params: req.params.set('auth', this.storageService.getAuthToken())
        });
        return next.handle(clonedRequest)
            .pipe(
                tap(event => {
                    if (event.type === HttpEventType.Response && event.status === 200) {
                        console.log('INTERCEPTOR LOG :', event.body);
                    }
                })
            );
    }
}
