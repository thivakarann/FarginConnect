import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRefundPolicyComponent } from './customer-refund-policy.component';

describe('CustomerRefundPolicyComponent', () => {
  let component: CustomerRefundPolicyComponent;
  let fixture: ComponentFixture<CustomerRefundPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerRefundPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerRefundPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
