import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPeriodAddComponent } from './refund-period-add.component';

describe('RefundPeriodAddComponent', () => {
  let component: RefundPeriodAddComponent;
  let fixture: ComponentFixture<RefundPeriodAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefundPeriodAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefundPeriodAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
