import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeNoDetailsComponent } from './recipe-no-details/recipe-no-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const recipeRoutes: Routes = [
    { path: '', component: RecipesComponent, canActivate: [AuthGuardService], children: [
        { path: '', component: RecipeNoDetailsComponent, data: {message: 'Please select a recipe'}, pathMatch: 'full' },
        { path: 'not-found', component: RecipeNoDetailsComponent, data: {message: 'Requested recipe not found'}},
        { path: 'new', component: RecipeEditComponent, data: {operation : 'create'}},
        { path: ':id', component: RecipeDetailsComponent },
        { path: ':id/edit', component: RecipeEditComponent, data: {operation : 'edit'} }
      ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipeRoutingModule {
}
