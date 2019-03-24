import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { StartEditIngredientAction } from './ngrx-store/shopping-list.actions';
import { AppState } from '../ngrx-store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;
  constructor(
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditIngredient(index: number) {
    this.store.dispatch(new StartEditIngredientAction(index));
  }
}
