import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentlinkResendComponent } from './paymentlink-resend.component';

describe('PaymentlinkResendComponent', () => {
  let component: PaymentlinkResendComponent;
  let fixture: ComponentFixture<PaymentlinkResendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentlinkResendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentlinkResendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
