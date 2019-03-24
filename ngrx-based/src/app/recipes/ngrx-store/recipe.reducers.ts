import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { AppState } from '../../ngrx-store/app.reducers';
import { RecipeAction, DELETE_RECIPE, UPDATE_RECIPE, ADD_RECIPE, LOAD_RECIPES } from './recipe.actions';

export class RecipeFeatureState extends AppState {
    recipes: RecipeState;
}

export interface RecipeState {
    recipes: Recipe[];
}

const initialState: RecipeState = {
    recipes: [
        new Recipe(1, 'Test Recipe 1', 'This is a test recipe 1',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfy_hKohYORfUnIkfYOsl5TJXFp91AWFmgNLAwsKKW7P_FEjHpPg',
        [
          new Ingredient('Potatoes', 2),
          new Ingredient('Tomatoes', 2)
        ]),
        new Recipe(2, 'Test Recipe 2', 'This is a test recipe 2',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfy_hKohYORfUnIkfYOsl5TJXFp91AWFmgNLAwsKKW7P_FEjHpPg',
        [
          new Ingredient('Apples', 2),
          new Ingredient('Oranges', 2)
        ])
      ]
};

export function recipesReducer(state = initialState, action: RecipeAction) {
  switch (action.type) {
    case DELETE_RECIPE:
      const updatedRecipesAfterDelete = [ ...state.recipes.filter(recipe => recipe.id !== action.payload) ];
      return {
        ...state,
        recipes: updatedRecipesAfterDelete
      };
    case UPDATE_RECIPE:
      const toBeUpdatedRecipeIndex = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      const newRecipes = [ ...state.recipes  ];
      newRecipes[toBeUpdatedRecipeIndex] = action.payload.recipe;
      return {
        ...state,
        recipes: newRecipes
      };
   case ADD_RECIPE:
      const existingRecipes = [ ...state.recipes ];
      const id = Math.max(...existingRecipes.map(recipeItem => recipeItem.id)) + 1;
      const newRecipe = action.payload;
      newRecipe.id = id;
      existingRecipes.push(newRecipe);
      return {
        ...state,
        recipes: existingRecipes
      };
    case LOAD_RECIPES:
      return {
        ...state,
        recipes : action.payload
      };
  }
    return state;
}
