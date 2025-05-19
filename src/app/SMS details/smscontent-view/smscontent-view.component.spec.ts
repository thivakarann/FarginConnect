import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmscontentViewComponent } from './smscontent-view.component';

describe('SmscontentViewComponent', () => {
  let component: SmscontentViewComponent;
  let fixture: ComponentFixture<SmscontentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmscontentViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmscontentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
