import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPeriodHistoryComponent } from './refund-period-history.component';

describe('RefundPeriodHistoryComponent', () => {
  let component: RefundPeriodHistoryComponent;
  let fixture: ComponentFixture<RefundPeriodHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefundPeriodHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefundPeriodHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
