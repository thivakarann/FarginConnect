import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpemailverfiyComponent } from './otpemailverfiy.component';

describe('OtpemailverfiyComponent', () => {
  let component: OtpemailverfiyComponent;
  let fixture: ComponentFixture<OtpemailverfiyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpemailverfiyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpemailverfiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
