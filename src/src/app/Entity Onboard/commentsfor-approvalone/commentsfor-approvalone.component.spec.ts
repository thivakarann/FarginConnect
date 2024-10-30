import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsforApprovaloneComponent } from './commentsfor-approvalone.component';

describe('CommentsforApprovaloneComponent', () => {
  let component: CommentsforApprovaloneComponent;
  let fixture: ComponentFixture<CommentsforApprovaloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsforApprovaloneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsforApprovaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
