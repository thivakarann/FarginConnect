import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchKycComponent } from './branch-kyc.component';

describe('BranchKycComponent', () => {
  let component: BranchKycComponent;
  let fixture: ComponentFixture<BranchKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchKycComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
