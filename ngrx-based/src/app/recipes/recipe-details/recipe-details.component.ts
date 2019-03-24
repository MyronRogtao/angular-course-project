import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddIngredientsAction } from '../../shopping-list/ngrx-store/shopping-list.actions';
import { RecipeFeatureState, RecipeState } from '../ngrx-store/recipe.reducers';
import { DeleteRecipeAction } from '../ngrx-store/recipe.actions';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  // @Input() recipe: Recipe;
  recipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<RecipeFeatureState>,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
         this.store.select('recipes')
            .pipe(
              map((recipeState: RecipeState) => recipeState.recipes.find(recipe => recipe.id === +params['id']))
            )
            .subscribe(
              recipe => this.recipe = recipe,
              error => this.router.navigate(['/recipes/not-found'])
            );
    });
  }

  addToShoppingList() {
    if (this.recipe.ingredients) {
      this.store.dispatch(new AddIngredientsAction(this.recipe.ingredients));
    }
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute});
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipeAction(this.recipe.id));
    this.router.navigate(['/recipes']);
  }

}
