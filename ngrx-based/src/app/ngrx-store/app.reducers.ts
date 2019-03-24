import { ShoppingListState, shoppingListReducer } from '../shopping-list/ngrx-store/shopping-list.reducers';
import { AuthState, authReducer } from '../auth/ngrx-store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export class AppState {
    shoppingList: ShoppingListState;
    auth: AuthState;
}

export const AppReducers: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer
};
