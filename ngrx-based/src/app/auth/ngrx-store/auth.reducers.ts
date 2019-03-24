import * as AuthActions from './auth.actions';

export interface AuthState {
    token: string;
    authenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    authenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthAction) {
    switch (action.type) {
        case AuthActions.SIGN_IN:
            return {
                ...state,
                authenticated: true,
                token: action.payload
            };
        case AuthActions.SIGN_OUT:
            return {
                ...state,
                authenticated: false,
                token: null
            };
        default: return { ...state };
    }
}
