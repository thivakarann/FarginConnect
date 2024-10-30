import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCreateComponent } from './sms-create.component';

describe('SmsCreateComponent', () => {
  let component: SmsCreateComponent;
  let fixture: ComponentFixture<SmsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
