import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCustomerIndividualviewComponent } from './branch-customer-individualview.component';

describe('BranchCustomerIndividualviewComponent', () => {
  let component: BranchCustomerIndividualviewComponent;
  let fixture: ComponentFixture<BranchCustomerIndividualviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchCustomerIndividualviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchCustomerIndividualviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
