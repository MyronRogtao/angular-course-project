import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { StoreageService } from '../shared/storeage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private sessionStore: StoreageService,
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    console.log('Registering user : ', email);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(ex => console.log(ex));
  }

  signIn(email: string, password: string) {
    console.log('Registering user : ', email);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userInformation => {
      userInformation.user.getIdToken()
        .then(token => {
          this.sessionStore.setAuthToken(token);
          this.router.navigate(['recipes']);
        });
      }).catch(ex => console.log(ex));
  }

  isAuthenticated(): boolean {
    return this.sessionStore.getAuthToken() !== null;
  }

  logout() {
    firebase.auth().signOut()
      .then(() => this.sessionStore.removeAuthToken());
  }
}
