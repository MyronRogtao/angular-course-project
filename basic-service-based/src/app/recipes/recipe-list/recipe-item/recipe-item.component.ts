import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  // onRecipeSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }

  // Can navigate programtically
  onRecipeSelected() {
    this.router.navigate([this.recipe.id], {
      relativeTo: this.activatedRoute
    });
  }

}
