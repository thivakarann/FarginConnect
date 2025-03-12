import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPaymentFailureComponent } from './customer-payment-failure.component';

describe('CustomerPaymentFailureComponent', () => {
  let component: CustomerPaymentFailureComponent;
  let fixture: ComponentFixture<CustomerPaymentFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPaymentFailureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPaymentFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
