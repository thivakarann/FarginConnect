import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTermsandpolicyComponent } from './customer-termsandpolicy.component';

describe('CustomerTermsandpolicyComponent', () => {
  let component: CustomerTermsandpolicyComponent;
  let fixture: ComponentFixture<CustomerTermsandpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTermsandpolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerTermsandpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
