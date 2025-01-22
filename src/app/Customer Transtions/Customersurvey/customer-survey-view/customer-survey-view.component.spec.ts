import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSurveyViewComponent } from './customer-survey-view.component';

describe('CustomerSurveyViewComponent', () => {
  let component: CustomerSurveyViewComponent;
  let fixture: ComponentFixture<CustomerSurveyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSurveyViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSurveyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
