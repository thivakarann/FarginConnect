import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsapprovalComponent } from './smsapproval.component';

describe('SmsapprovalComponent', () => {
  let component: SmsapprovalComponent;
  let fixture: ComponentFixture<SmsapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsapprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
