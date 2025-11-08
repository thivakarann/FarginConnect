import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchkycEditComponent } from './branchkyc-edit.component';

describe('BranchkycEditComponent', () => {
  let component: BranchkycEditComponent;
  let fixture: ComponentFixture<BranchkycEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchkycEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchkycEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
