import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePaymentViewComponent } from './service-payment-view.component';

describe('ServicePaymentViewComponent', () => {
  let component: ServicePaymentViewComponent;
  let fixture: ComponentFixture<ServicePaymentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicePaymentViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicePaymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
