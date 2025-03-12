import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPaymentSuccessComponent } from './customer-payment-success.component';

describe('CustomerPaymentSuccessComponent', () => {
  let component: CustomerPaymentSuccessComponent;
  let fixture: ComponentFixture<CustomerPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPaymentSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
