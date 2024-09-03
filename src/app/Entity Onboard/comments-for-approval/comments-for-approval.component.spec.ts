import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsForApprovalComponent } from './comments-for-approval.component';

describe('CommentsForApprovalComponent', () => {
  let component: CommentsForApprovalComponent;
  let fixture: ComponentFixture<CommentsForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsForApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
