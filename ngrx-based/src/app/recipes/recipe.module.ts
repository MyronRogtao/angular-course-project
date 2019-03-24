import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeNoDetailsComponent } from './recipe-no-details/recipe-no-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { recipesReducer } from './ngrx-store/recipe.reducers';
import { RecipeEffects } from './ngrx-store/recipe.effects';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeNoDetailsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
    StoreModule.forFeature('recipes', recipesReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]
})
export class RecipeModule { }
