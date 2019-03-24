import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT_INGREDIENT = 'START_EDIT_INGREDIENT';
export const STOP_EDIT_INGREDIENT = 'STOP_EDIT_INGREDIENT';

export class AddIngredientAction implements Action {
    type: string = ADD_INGREDIENT;
    constructor(public payload: Ingredient) {
    }
}

export class AddIngredientsAction implements Action {
    type: string = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {
    }
}

export class UpdateIngredientAction implements Action {
    type: string = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient) {
    }
}

export class DeleteIngredientAction implements Action {
    type: string = DELETE_INGREDIENT;
    payload: any;
}

export class StartEditIngredientAction implements Action {
    type: string = START_EDIT_INGREDIENT;
    constructor(public payload: number) {
    }
}

export class StopEditIngredientAction implements Action {
    type: string = STOP_EDIT_INGREDIENT;
    payload: any;
}

export type ShoppingListActions = AddIngredientAction |
AddIngredientsAction |
UpdateIngredientAction |
DeleteIngredientAction |
StopEditIngredientAction;
