import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVerifyViewComponent } from './customer-verify-view.component';

describe('CustomerVerifyViewComponent', () => {
  let component: CustomerVerifyViewComponent;
  let fixture: ComponentFixture<CustomerVerifyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerVerifyViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerVerifyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
