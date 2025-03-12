import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOtpVerifyComponent } from './customer-otp-verify.component';

describe('CustomerOtpVerifyComponent', () => {
  let component: CustomerOtpVerifyComponent;
  let fixture: ComponentFixture<CustomerOtpVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOtpVerifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
