import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from './ngrx-store/auth.reducers';
import { AppState } from '../ngrx-store/app.reducers';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.select('auth')
    .pipe( take(1))
      .subscribe((authState: AuthState) => {
        this.isAuthenticated = authState.authenticated;
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['signin']);
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['auth', 'signin']);
    }
  }
}

