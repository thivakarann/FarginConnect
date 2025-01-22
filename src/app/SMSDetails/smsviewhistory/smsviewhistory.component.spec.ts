import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsviewhistoryComponent } from './smsviewhistory.component';

describe('SmsviewhistoryComponent', () => {
  let component: SmsviewhistoryComponent;
  let fixture: ComponentFixture<SmsviewhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsviewhistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsviewhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
