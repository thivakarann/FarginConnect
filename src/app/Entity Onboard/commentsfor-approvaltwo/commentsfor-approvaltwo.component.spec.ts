import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsforApprovaltwoComponent } from './commentsfor-approvaltwo.component';

describe('CommentsforApprovaltwoComponent', () => {
  let component: CommentsforApprovaltwoComponent;
  let fixture: ComponentFixture<CommentsforApprovaltwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsforApprovaltwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsforApprovaltwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
