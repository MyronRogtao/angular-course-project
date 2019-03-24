import { Recipe } from '../recipe.model';
import { Action } from '@ngrx/store';

export const LOAD_RECIPES = 'LOAD_RECIPES';
export const FETCH_RECIPES =  'FETCH_RECIPES';
export const STORE_RECIPES =  'STORE_RECIPES';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const ADD_RECIPE = 'AADD_RECIPE';
export const UPDATE_RECIPE =  'UPDATE_RECIPE';

export class LoadRecipesAction implements Action {
    type: string = LOAD_RECIPES;
    constructor(public payload: Recipe[]) {}
}

export class FetchRecipesAction implements Action {
    type: string = FETCH_RECIPES;
    payload: any;
}

export class StoreRecipesAction implements Action {
    type: string = STORE_RECIPES;
    payload: any;
}

export class DeleteRecipeAction implements Action {
    type: string = DELETE_RECIPE;
    constructor(public payload: number) {}
}

export class UpdateRecipeAction implements Action {
    type: string = UPDATE_RECIPE;
    constructor(public payload: { id: number, recipe: Recipe }) {}
}

export class AddRecipeAction implements Action {
    type: string = ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export type RecipeAction =
LoadRecipesAction |
StoreRecipesAction |
AddRecipeAction |
DeleteRecipeAction |
UpdateRecipeAction |
FetchRecipesAction;
