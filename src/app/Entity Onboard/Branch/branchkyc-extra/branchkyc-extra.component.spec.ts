import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchkycExtraComponent } from './branchkyc-extra.component';

describe('BranchkycExtraComponent', () => {
  let component: BranchkycExtraComponent;
  let fixture: ComponentFixture<BranchkycExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchkycExtraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchkycExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
