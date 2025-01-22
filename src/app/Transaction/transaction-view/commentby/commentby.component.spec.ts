import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentbyComponent } from './commentby.component';

describe('CommentbyComponent', () => {
  let component: CommentbyComponent;
  let fixture: ComponentFixture<CommentbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentbyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
