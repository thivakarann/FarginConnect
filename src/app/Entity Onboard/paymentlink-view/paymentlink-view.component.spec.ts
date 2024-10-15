import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentlinkViewComponent } from './paymentlink-view.component';

describe('PaymentlinkViewComponent', () => {
  let component: PaymentlinkViewComponent;
  let fixture: ComponentFixture<PaymentlinkViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentlinkViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentlinkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
