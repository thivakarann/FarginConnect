import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalpayViewComponent } from './additionalpay-view.component';

describe('AdditionalpayViewComponent', () => {
  let component: AdditionalpayViewComponent;
  let fixture: ComponentFixture<AdditionalpayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalpayViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionalpayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
