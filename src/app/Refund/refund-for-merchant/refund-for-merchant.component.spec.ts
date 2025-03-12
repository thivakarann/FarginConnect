import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundForMerchantComponent } from './refund-for-merchant.component';

describe('RefundForMerchantComponent', () => {
  let component: RefundForMerchantComponent;
  let fixture: ComponentFixture<RefundForMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefundForMerchantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefundForMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
