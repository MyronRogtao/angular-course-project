import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
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
  ];

  constructor(
    private shoppingListService: ShoppingListService) {
     }

  getRecipies() {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  updateRecipe(recipe: Recipe, recipeId: number) {
    const index = this.recipes.findIndex(recipeItem => recipeItem.id === recipeId);
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    const maxRecipeId = Math.max(...this.recipes.slice().map(recipeItem => recipeItem.id));
    recipe.id = maxRecipeId + 1;
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    const toBeDeletedRecipeIndex = this.recipes.findIndex(recipeItem => recipeItem.id === id);
    if (toBeDeletedRecipeIndex !== -1) {
      this.recipes.splice(toBeDeletedRecipeIndex, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  loadRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
