import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, flatMap, take,  } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx-store/app.reducers';
import { AuthState } from './ngrx-store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
            .pipe(
                take(1),
                flatMap((data: AuthState) => {
                    const clonedRequest = req.clone({
                        headers: req.headers.set('some-header', 'some-header-value'),
                        params: req.params.set('auth', data.token)
                    });
                    return next.handle(clonedRequest)
                    .pipe(
                        tap(event => {
                            if (event.type === HttpEventType.Response && event.status === 200) {
                                console.log('INTERCEPTOR LOG :', event.body);
                            }
                        })
                    );
                })
            );
    }
}
