import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtransCommentsComponent } from './addtrans-comments.component';

describe('AddtransCommentsComponent', () => {
  let component: AddtransCommentsComponent;
  let fixture: ComponentFixture<AddtransCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddtransCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddtransCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
