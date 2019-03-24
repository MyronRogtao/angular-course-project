import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  // Can navigate programtically
  onRecipeSelected() {
    this.router.navigate([this.recipe.id], {
      relativeTo: this.activatedRoute
    });
  }

}
