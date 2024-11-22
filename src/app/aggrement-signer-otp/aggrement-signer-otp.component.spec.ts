import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementSignerOtpComponent } from './aggrement-signer-otp.component';

describe('AggrementSignerOtpComponent', () => {
  let component: AggrementSignerOtpComponent;
  let fixture: ComponentFixture<AggrementSignerOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggrementSignerOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggrementSignerOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
