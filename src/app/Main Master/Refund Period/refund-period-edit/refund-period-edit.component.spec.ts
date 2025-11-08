import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPeriodEditComponent } from './refund-period-edit.component';

describe('RefundPeriodEditComponent', () => {
  let component: RefundPeriodEditComponent;
  let fixture: ComponentFixture<RefundPeriodEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefundPeriodEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefundPeriodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
