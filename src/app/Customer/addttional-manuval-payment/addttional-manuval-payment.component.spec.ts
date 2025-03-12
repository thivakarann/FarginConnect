import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddttionalManuvalPaymentComponent } from './addttional-manuval-payment.component';

describe('AddttionalManuvalPaymentComponent', () => {
  let component: AddttionalManuvalPaymentComponent;
  let fixture: ComponentFixture<AddttionalManuvalPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddttionalManuvalPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddttionalManuvalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
