import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePaymentsViewallComponent } from './service-payments-viewall.component';

describe('ServicePaymentsViewallComponent', () => {
  let component: ServicePaymentsViewallComponent;
  let fixture: ComponentFixture<ServicePaymentsViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicePaymentsViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicePaymentsViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
