import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[];
  ingredientAdded = new Subject<Ingredient[]>();
  ingredientEditInProgress = new Subject<number>();

  constructor() { }

  getIngredient(index: number) {
    return this.ingredients[index];
  }
}
