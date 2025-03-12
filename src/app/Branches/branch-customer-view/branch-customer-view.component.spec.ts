import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCustomerViewComponent } from './branch-customer-view.component';

describe('BranchCustomerViewComponent', () => {
  let component: BranchCustomerViewComponent;
  let fixture: ComponentFixture<BranchCustomerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchCustomerViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchCustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
