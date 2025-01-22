import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmshistoryComponent } from './smshistory.component';

describe('SmshistoryComponent', () => {
  let component: SmshistoryComponent;
  let fixture: ComponentFixture<SmshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmshistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
