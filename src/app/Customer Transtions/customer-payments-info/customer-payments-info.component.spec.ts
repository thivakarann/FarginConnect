import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPaymentsInfoComponent } from './customer-payments-info.component';

describe('CustomerPaymentsInfoComponent', () => {
  let component: CustomerPaymentsInfoComponent;
  let fixture: ComponentFixture<CustomerPaymentsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPaymentsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPaymentsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
