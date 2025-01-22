import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecustomerTicketImageComponent } from './servicecustomer-ticket-image.component';

describe('ServicecustomerTicketImageComponent', () => {
  let component: ServicecustomerTicketImageComponent;
  let fixture: ComponentFixture<ServicecustomerTicketImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicecustomerTicketImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicecustomerTicketImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
