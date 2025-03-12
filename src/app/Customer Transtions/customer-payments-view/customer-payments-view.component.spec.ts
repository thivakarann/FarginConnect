import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPaymentsViewComponent } from './customer-payments-view.component';

describe('CustomerPaymentsViewComponent', () => {
  let component: CustomerPaymentsViewComponent;
  let fixture: ComponentFixture<CustomerPaymentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPaymentsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPaymentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
