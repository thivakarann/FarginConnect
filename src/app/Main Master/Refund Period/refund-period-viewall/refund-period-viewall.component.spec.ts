import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPeriodViewallComponent } from './refund-period-viewall.component';

describe('RefundPeriodViewallComponent', () => {
  let component: RefundPeriodViewallComponent;
  let fixture: ComponentFixture<RefundPeriodViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefundPeriodViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefundPeriodViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
