import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../../../app/ngrx-store/app.reducers';
import { Store } from '@ngrx/store';
import { InitiateSignUpAction } from '../ngrx-store/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    this.store.dispatch(new InitiateSignUpAction({
      email: formData.value['email'],
      password: formData.value['password']
    }));
  }

}
