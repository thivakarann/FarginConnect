import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsHistoryEntityComponent } from './sms-history-entity.component';

describe('SmsHistoryEntityComponent', () => {
  let component: SmsHistoryEntityComponent;
  let fixture: ComponentFixture<SmsHistoryEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsHistoryEntityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsHistoryEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
