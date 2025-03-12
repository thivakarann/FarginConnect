import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPaymentsViewallComponent } from './other-payments-viewall.component';

describe('OtherPaymentsViewallComponent', () => {
  let component: OtherPaymentsViewallComponent;
  let fixture: ComponentFixture<OtherPaymentsViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherPaymentsViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherPaymentsViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
