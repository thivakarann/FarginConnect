import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantTransactionViewComponent } from './merchant-transaction-view.component';

describe('MerchantTransactionViewComponent', () => {
  let component: MerchantTransactionViewComponent;
  let fixture: ComponentFixture<MerchantTransactionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchantTransactionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
