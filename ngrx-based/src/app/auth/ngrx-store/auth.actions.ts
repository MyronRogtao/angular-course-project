import { Action } from '@ngrx/store';

export const INITIATE_SIGN_IN = 'INITIATE_SIGN_IN';
export const INITIATE_SIGN_UP = 'INITIATE_SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export class InitiateSignInAction implements Action {
    type: string = INITIATE_SIGN_IN;
    constructor(public payload: { email: string, password: string }) {}
}

export class InitiateSignUpAction implements Action {
    type: string = INITIATE_SIGN_UP;
    constructor(public payload: { email: string, password: string }) {}
}

export class SignInAction implements Action {
    type: string = SIGN_IN;
    constructor(public payload: string) {}
}

export class SignOutAction implements Action {
    type: string = SIGN_OUT;
    payload: any;
}

export type AuthAction = SignInAction |  SignOutAction | InitiateSignInAction;
