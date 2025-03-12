import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSurveyquestionsComponent } from './view-surveyquestions.component';

describe('ViewSurveyquestionsComponent', () => {
  let component: ViewSurveyquestionsComponent;
  let fixture: ComponentFixture<ViewSurveyquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSurveyquestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSurveyquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
