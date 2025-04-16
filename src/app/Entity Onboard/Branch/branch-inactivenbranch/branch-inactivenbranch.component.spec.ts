import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchInactivenbranchComponent } from './branch-inactivenbranch.component';

describe('BranchInactivenbranchComponent', () => {
  let component: BranchInactivenbranchComponent;
  let fixture: ComponentFixture<BranchInactivenbranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchInactivenbranchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchInactivenbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
