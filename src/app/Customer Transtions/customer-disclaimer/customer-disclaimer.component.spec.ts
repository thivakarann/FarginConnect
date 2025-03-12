import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDisclaimerComponent } from './customer-disclaimer.component';

describe('CustomerDisclaimerComponent', () => {
  let component: CustomerDisclaimerComponent;
  let fixture: ComponentFixture<CustomerDisclaimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDisclaimerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
