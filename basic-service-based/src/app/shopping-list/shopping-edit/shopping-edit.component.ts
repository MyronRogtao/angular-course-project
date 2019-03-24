import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  editMode = false;
  editedIngredientIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.ingredientEditInProgress
      .subscribe(index => {
        this.editMode = true;
        this.editedIngredientIndex = index;
        const ingredient: Ingredient = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          ingredientName: ingredient.name,
          ingredientAmount: ingredient.amount
        });
      });
  }

  onSubmit() {
    const name = this.shoppingListForm.value.ingredientName;
    const amount = this.shoppingListForm.value.ingredientAmount;
    if (this.editMode) {
      this.shoppingListService.updateIngredient(new Ingredient(name, amount), this.editedIngredientIndex);
    } else {
      this.shoppingListService.addIngredient(new Ingredient(name, amount));
    }
    this.resetForm();
  }

  resetForm() {
    this.editedIngredientIndex = undefined;
    this.editMode = false;
    this.shoppingListForm.resetForm();
  }

  onClearData() {
    this.shoppingListForm.resetForm();
  }

  onDeleeteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.resetForm();
  }

}
