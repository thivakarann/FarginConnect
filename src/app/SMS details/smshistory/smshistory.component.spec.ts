import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSHistoryComponent } from './smshistory.component';

describe('SMSHistoryComponent', () => {
  let component: SMSHistoryComponent;
  let fixture: ComponentFixture<SMSHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SMSHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SMSHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
