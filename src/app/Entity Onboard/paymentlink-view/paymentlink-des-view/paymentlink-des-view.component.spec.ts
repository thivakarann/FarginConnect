import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentlinkDesViewComponent } from './paymentlink-des-view.component';

describe('PaymentlinkDesViewComponent', () => {
  let component: PaymentlinkDesViewComponent;
  let fixture: ComponentFixture<PaymentlinkDesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentlinkDesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentlinkDesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
