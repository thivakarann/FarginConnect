import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransactionIndividualviewComponent } from './customer-transaction-individualview.component';

describe('CustomerTransactionIndividualviewComponent', () => {
  let component: CustomerTransactionIndividualviewComponent;
  let fixture: ComponentFixture<CustomerTransactionIndividualviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTransactionIndividualviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerTransactionIndividualviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
