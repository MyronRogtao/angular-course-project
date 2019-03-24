import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeChangedSubscription: Subscription;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipies();

    this.recipeChangedSubscription = this.recipeService.recipesChanged
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.recipeChangedSubscription.unsubscribe();
  }

}
