import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { WelcomePageComponent } from './core/welcome-page/welcome-page.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent, pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule', canLoad: [AuthGuardService] },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
