import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeNoDetailsComponent } from './recipe-no-details.component';

describe('RecipeNoDetailsComponent', () => {
  let component: RecipeNoDetailsComponent;
  let fixture: ComponentFixture<RecipeNoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeNoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeNoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
