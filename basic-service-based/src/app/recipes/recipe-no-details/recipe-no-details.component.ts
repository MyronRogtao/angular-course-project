import { Component, OnInit } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-no-details',
  templateUrl: './recipe-no-details.component.html',
  styleUrls: ['./recipe-no-details.component.css']
})
export class RecipeNoDetailsComponent implements OnInit {
  message: 'Please select a recipe';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe((data: Data) => {
        this.message = data['message'];
      });
  }
}
