import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Ingredient } from './ingredient.model';
import { RecipeService } from '../recipes/recipe.service';
import { StoreageService } from './storeage.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private sessionStore: StoreageService) { }

  saveRecipes() {
    return this.http.put('https://elated-chassis-127611.firebaseio.com/recipes.json',
      this.recipeService.getRecipies(),
      {
        params: { someQueryParam : 'someQueryParamValue' },
        headers: new HttpHeaders().append('Key', 'Value')
      });
  }

  saveRecipesWithUploadDownloadProgress() {
    const request = new HttpRequest('PUT', 'https://elated-chassis-127611.firebaseio.com/recipes.json',
      this.recipeService.getRecipies(), {
        params: new HttpParams().set('someQueryParam', 'someQueryParamValue'),
        reportProgress: true,
        headers: new HttpHeaders(),
        responseType: 'json'
    });

    return this.http.request(request);
  }

  getRecipes() {
    console.log(this.sessionStore.getAuthToken());
    return this.http.get('https://elated-chassis-127611.firebaseio.com/recipes.json',
      {
        params: { someQueryParam : 'someQueryParamValue' }
      });
  }

  saveIngredients(ingredients: Ingredient[]) {
    return this.http.put('https://elated-chassis-127611.firebaseio.com/ingredients.json', ingredients);
  }

  getIngredients() {
    return this.http.get('https://elated-chassis-127611.firebaseio.com/ingredients.json');
  }
}
