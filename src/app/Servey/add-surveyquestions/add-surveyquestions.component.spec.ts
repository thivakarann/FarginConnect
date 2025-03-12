import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSurveyquestionsComponent } from './add-surveyquestions.component';

describe('AddSurveyquestionsComponent', () => {
  let component: AddSurveyquestionsComponent;
  let fixture: ComponentFixture<AddSurveyquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSurveyquestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSurveyquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
