import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFarginPolicyComponent } from './customer-fargin-policy.component';

describe('CustomerFarginPolicyComponent', () => {
  let component: CustomerFarginPolicyComponent;
  let fixture: ComponentFixture<CustomerFarginPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerFarginPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerFarginPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
