import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustDescriptionCommentComponent } from './cust-description-comment.component';

describe('CustDescriptionCommentComponent', () => {
  let component: CustDescriptionCommentComponent;
  let fixture: ComponentFixture<CustDescriptionCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustDescriptionCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustDescriptionCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
