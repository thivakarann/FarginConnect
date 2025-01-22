import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersurveyIndividualviewComponent } from './customersurvey-individualview.component';

describe('CustomersurveyIndividualviewComponent', () => {
  let component: CustomersurveyIndividualviewComponent;
  let fixture: ComponentFixture<CustomersurveyIndividualviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersurveyIndividualviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersurveyIndividualviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
