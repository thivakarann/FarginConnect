import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallIndividualCustomerviewComponent } from './overall-individual-customerview.component';

describe('OverallIndividualCustomerviewComponent', () => {
  let component: OverallIndividualCustomerviewComponent;
  let fixture: ComponentFixture<OverallIndividualCustomerviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverallIndividualCustomerviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverallIndividualCustomerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
