import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import * as  AuthActions from './auth.actions';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    @Effect()
    signIn = this.actions$
        .pipe(
            ofType(AuthActions.INITIATE_SIGN_IN),
            switchMap((action: AuthActions.AuthAction) => firebase.auth()
                .signInWithEmailAndPassword(action.payload.email, action.payload.password)),
            switchMap(userInformation => userInformation.user.getIdToken()),
            map(token => new AuthActions.SignInAction(token)),
            tap(action => this.router.navigate(['/']))
        );

    @Effect({ dispatch: false })
    signUp = this.actions$
        .pipe(
            ofType(AuthActions.INITIATE_SIGN_UP),
            switchMap((action: AuthActions.AuthAction) => firebase.auth()
                .createUserWithEmailAndPassword(action.payload.email, action.payload.password))
        );

    @Effect({ dispatch: false})
    signOut = this.actions$
        .pipe(
            ofType(AuthActions.SIGN_OUT),
            tap((action: AuthActions.SignOutAction) => {
                this.router.navigate(['auth', 'signin']);
            })
        );
    constructor(private actions$: Actions, private router: Router) {}
}
