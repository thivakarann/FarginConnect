import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentBussinessdocumentComponent } from './comment-bussinessdocument.component';

describe('CommentBussinessdocumentComponent', () => {
  let component: CommentBussinessdocumentComponent;
  let fixture: ComponentFixture<CommentBussinessdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentBussinessdocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentBussinessdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
