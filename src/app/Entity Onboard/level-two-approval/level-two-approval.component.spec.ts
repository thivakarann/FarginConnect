import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelTwoApprovalComponent } from './level-two-approval.component';

describe('LevelTwoApprovalComponent', () => {
  let component: LevelTwoApprovalComponent;
  let fixture: ComponentFixture<LevelTwoApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelTwoApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LevelTwoApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
