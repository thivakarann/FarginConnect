import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSHistoryViewComponent } from './smshistory-view.component';

describe('SMSHistoryViewComponent', () => {
  let component: SMSHistoryViewComponent;
  let fixture: ComponentFixture<SMSHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SMSHistoryViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SMSHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
