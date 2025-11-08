import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchkycInfoComponent } from './branchkyc-info.component';

describe('BranchkycInfoComponent', () => {
  let component: BranchkycInfoComponent;
  let fixture: ComponentFixture<BranchkycInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchkycInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchkycInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
