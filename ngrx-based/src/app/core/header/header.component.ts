import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../../auth/ngrx-store/auth.reducers';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx-store/app.reducers';
import { SignOutAction } from '../../auth/ngrx-store/auth.actions';
import { FetchRecipesAction, StoreRecipesAction } from '../../recipes/ngrx-store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
  }

  onSaveData() {
    this.store.dispatch(new StoreRecipesAction());
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipesAction());
  }

  onLogout() {
    this.store.dispatch(new SignOutAction());
    this.router.navigate(['auth', 'signin']);
  }

  get authState(): Observable<AuthState> {
    return this.store.select('auth');
  }
}
