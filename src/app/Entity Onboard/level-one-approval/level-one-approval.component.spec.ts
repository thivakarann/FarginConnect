import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelOneApprovalComponent } from './level-one-approval.component';

describe('LevelOneApprovalComponent', () => {
  let component: LevelOneApprovalComponent;
  let fixture: ComponentFixture<LevelOneApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelOneApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LevelOneApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
