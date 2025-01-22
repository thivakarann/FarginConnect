import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSurveyquestionsComponent } from './update-surveyquestions.component';

describe('UpdateSurveyquestionsComponent', () => {
  let component: UpdateSurveyquestionsComponent;
  let fixture: ComponentFixture<UpdateSurveyquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSurveyquestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSurveyquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
