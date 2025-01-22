import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPrivacyPolicyComponent } from './customer-privacy-policy.component';

describe('CustomerPrivacyPolicyComponent', () => {
  let component: CustomerPrivacyPolicyComponent;
  let fixture: ComponentFixture<CustomerPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPrivacyPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
