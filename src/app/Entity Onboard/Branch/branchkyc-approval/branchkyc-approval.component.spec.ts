import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchkycApprovalComponent } from './branchkyc-approval.component';

describe('BranchkycApprovalComponent', () => {
  let component: BranchkycApprovalComponent;
  let fixture: ComponentFixture<BranchkycApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchkycApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchkycApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
