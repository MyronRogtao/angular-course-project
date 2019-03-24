import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  navigation: {loadRecipies: boolean, loadShoppingList: boolean};

  ngOnInit() {
    this.navigation = {
      loadRecipies : true,
      loadShoppingList : false
    };

    firebase.initializeApp({
      apiKey: 'AIzaSyDl1j0aKoDdxQO6frgIW855eFZYddKyywo',
      authDomain: 'elated-chassis-127611.firebaseapp.com'
    });
  }
  onNavigation(navigationParams: {loadRecipies: boolean, loadShoppingList: boolean}) {
    this.navigation = navigationParams;
  }
}
