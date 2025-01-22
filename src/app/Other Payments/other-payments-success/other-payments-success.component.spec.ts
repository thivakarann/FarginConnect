import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPaymentsSuccessComponent } from './other-payments-success.component';

describe('OtherPaymentsSuccessComponent', () => {
  let component: OtherPaymentsSuccessComponent;
  let fixture: ComponentFixture<OtherPaymentsSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherPaymentsSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherPaymentsSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
