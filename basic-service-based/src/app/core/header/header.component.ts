import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../shared/server.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Recipe } from '../../recipes/recipe.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private serverService: ServerService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSaveData() {
    this.serverService.saveRecipes()
      .subscribe(
        (response) => console.log('Successfully saved the recipe data')
      );
    this.serverService.saveRecipesWithUploadDownloadProgress()
      .subscribe(event => {
        console.log('PROGRESS LOG: ', event);
      });
  }

  onFetchData() {
    this.serverService.getRecipes()
      .subscribe(
        (recipes: Recipe[]) => this.recipeService.loadRecipes(recipes)
      );
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['auth', 'signin']);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
