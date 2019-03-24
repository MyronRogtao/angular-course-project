import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  AddIngredientAction,
  UpdateIngredientAction,
  DeleteIngredientAction,
  StopEditIngredientAction
} from '../ngrx-store/shopping-list.actions';
import { ShoppingListState } from '../ngrx-store/shopping-list.reducers';
import { AppState } from '../../ngrx-store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  editMode = false;

  constructor(
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('shoppingList')
      .subscribe((data: ShoppingListState) => {
        if (data.editedIngredientIndex > -1) {
          this.editMode = true;
          this.shoppingListForm.setValue({
            ingredientName: data.editedIngredient.name,
            ingredientAmount: data.editedIngredient.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit() {
    const name = this.shoppingListForm.value.ingredientName;
    const amount = this.shoppingListForm.value.ingredientAmount;
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredientAction(new Ingredient(name, amount)));
    } else {
      this.store.dispatch(new AddIngredientAction(new Ingredient(name, amount)));
    }
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.shoppingListForm.resetForm();
  }

  onClearData() {
    this.shoppingListForm.resetForm();
  }

  onDeleteIngredient() {
    this.store.dispatch(new DeleteIngredientAction());
    this.resetForm();
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEditIngredientAction());
  }

}
