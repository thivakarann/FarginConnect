import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsDescriptionComponent } from './sms-description.component';

describe('SmsDescriptionComponent', () => {
  let component: SmsDescriptionComponent;
  let fixture: ComponentFixture<SmsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
