import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuvalpayWithoutOtpComponent } from './manuvalpay-without-otp.component';

describe('ManuvalpayWithoutOtpComponent', () => {
  let component: ManuvalpayWithoutOtpComponent;
  let fixture: ComponentFixture<ManuvalpayWithoutOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManuvalpayWithoutOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManuvalpayWithoutOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
