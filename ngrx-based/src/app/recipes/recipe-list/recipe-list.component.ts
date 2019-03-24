import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RecipeFeatureState, RecipeState } from '../ngrx-store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<RecipeState>;

  constructor(
    private store: Store<RecipeFeatureState>
    ) { }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }
}
