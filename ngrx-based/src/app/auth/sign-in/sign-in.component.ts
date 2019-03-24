import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/ngrx-store/app.reducers';
import { InitiateSignInAction } from '../ngrx-store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    // this.authService.signIn(formData.value['email'], formData.value['password']);
    this.store.dispatch(new InitiateSignInAction({
      email: formData.value['email'],
      password: formData.value['password']
    }));
  }

}
