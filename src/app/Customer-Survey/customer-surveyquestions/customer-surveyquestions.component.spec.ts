import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSurveyquestionsComponent } from './customer-surveyquestions.component';

describe('CustomerSurveyquestionsComponent', () => {
  let component: CustomerSurveyquestionsComponent;
  let fixture: ComponentFixture<CustomerSurveyquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSurveyquestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSurveyquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
