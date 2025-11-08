import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketapprovalComponent } from './customer-ticketapproval.component';

describe('CustomerTicketapprovalComponent', () => {
  let component: CustomerTicketapprovalComponent;
  let fixture: ComponentFixture<CustomerTicketapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTicketapprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerTicketapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
