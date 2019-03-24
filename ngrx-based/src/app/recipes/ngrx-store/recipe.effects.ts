import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {  FETCH_RECIPES, LoadRecipesAction, STORE_RECIPES } from './recipe.actions';
import { map, switchMap, flatMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RecipeFeatureState, RecipeState } from './recipe.reducers';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$
        .pipe(
            ofType(FETCH_RECIPES),
            switchMap(action => {
                return this.http.get<Recipe[]>('https://elated-chassis-127611.firebaseio.com/recipes.json');
            }),
            map(recipes => new LoadRecipesAction(recipes))
        );

    @Effect({ dispatch: false })
    storeRecipes = this.actions$
        .pipe(
            ofType(STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, recipeState]) => this.http.put('https://elated-chassis-127611.firebaseio.com/recipes.json',
                recipeState.recipes))
        );
    constructor(
        public actions$: Actions,
        public store: Store<RecipeFeatureState>,
        public http: HttpClient) {}
}
