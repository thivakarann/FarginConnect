import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDetailsCustomerComponent } from './plan-details-customer.component';

describe('PlanDetailsCustomerComponent', () => {
  let component: PlanDetailsCustomerComponent;
  let fixture: ComponentFixture<PlanDetailsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanDetailsCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanDetailsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
