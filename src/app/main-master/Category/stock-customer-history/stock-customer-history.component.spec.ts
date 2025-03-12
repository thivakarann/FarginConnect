import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCustomerHistoryComponent } from './stock-customer-history.component';

describe('StockCustomerHistoryComponent', () => {
  let component: StockCustomerHistoryComponent;
  let fixture: ComponentFixture<StockCustomerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockCustomerHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockCustomerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
