import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean;
  recipeId: number;
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipe = new Recipe();
    this.activatedRoute.data.subscribe((data: Data) => {
      this.editMode = data['operation'] === 'edit';
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.buildRecipeForm();
    });
  }

  buildRecipeForm() {
    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.recipeId);
    }
    // If user tries to access any recipe that is not present in the lists
    if (!this.recipe) {
      this.router.navigate(['/recipes/not-found']);
    }
    // else prepare the recipe form for edit or createe operation
    this.recipeForm = new FormGroup({
      recipeName: new FormControl(this.recipe.name, Validators.required),
      imageUrl: new FormControl(this.recipe.imageUrl, Validators.required),
      recipeDescription: new FormControl(this.recipe.description, Validators.required),
      ingredients: this.prepareIngrdientFormArray(this.recipe.ingredients)
    });
  }

  prepareIngrdientFormArray(ingredients: Array<Ingredient>): FormArray {
    const formArrayControl: FormArray = new FormArray([]);
    if (ingredients) {
      ingredients.forEach(ingredient =>
        formArrayControl.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
        }))
      );
    }
    return formArrayControl;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
      }));
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo : this.activatedRoute});
  }

  onSubmit() {
    this.recipe.name = this.recipeForm.value['recipeName'];
    this.recipe.description = this.recipeForm.value['recipeDescription'];
    this.recipe.imageUrl = this.recipeForm.value['imageUrl'];
    this.recipe.ingredients = this.recipeForm.value['ingredients'];

    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipe, this.recipeId);
    } else {
      this.recipeService.addRecipe(this.recipe);
    }
    this.onCancel();
  }

  get recipeName() {
    return this.recipeForm.get('recipeName') as FormControl;
  }

  get imageUrl() {
    return this.recipeForm.get('imageUrl') as FormControl;
  }

  get recipeDescription() {
    return this.recipeForm.get('recipeDescription') as FormControl;
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  getName(ingredientFormGroup: FormGroup) {
    return ingredientFormGroup.get('name') as FormControl;
  }

  getAmount(ingredientFormGroup: FormGroup) {
    return ingredientFormGroup.get('amount') as FormControl;
  }

}
