import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantRefundComponent } from './merchant-refund.component';

describe('MerchantRefundComponent', () => {
  let component: MerchantRefundComponent;
  let fixture: ComponentFixture<MerchantRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchantRefundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
