import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementSignerTwoOtpComponent } from './aggrement-signer-two-otp.component';

describe('AggrementSignerTwoOtpComponent', () => {
  let component: AggrementSignerTwoOtpComponent;
  let fixture: ComponentFixture<AggrementSignerTwoOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggrementSignerTwoOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggrementSignerTwoOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
