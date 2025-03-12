import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherpayViewComponent } from './otherpay-view.component';

describe('OtherpayViewComponent', () => {
  let component: OtherpayViewComponent;
  let fixture: ComponentFixture<OtherpayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherpayViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherpayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
