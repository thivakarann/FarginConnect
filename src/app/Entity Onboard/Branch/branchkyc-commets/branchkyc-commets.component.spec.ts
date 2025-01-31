import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchkycCommetsComponent } from './branchkyc-commets.component';

describe('BranchkycCommetsComponent', () => {
  let component: BranchkycCommetsComponent;
  let fixture: ComponentFixture<BranchkycCommetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchkycCommetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchkycCommetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
