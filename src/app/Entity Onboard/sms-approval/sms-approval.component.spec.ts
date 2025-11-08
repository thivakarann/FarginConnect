import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsApprovalComponent } from './sms-approval.component';

describe('SmsApprovalComponent', () => {
  let component: SmsApprovalComponent;
  let fixture: ComponentFixture<SmsApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
