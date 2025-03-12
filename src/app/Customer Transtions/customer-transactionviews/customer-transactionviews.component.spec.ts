import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransactionviewsComponent } from './customer-transactionviews.component';

describe('CustomerTransactionviewsComponent', () => {
  let component: CustomerTransactionviewsComponent;
  let fixture: ComponentFixture<CustomerTransactionviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTransactionviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerTransactionviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
