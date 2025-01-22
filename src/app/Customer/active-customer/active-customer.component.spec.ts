import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCustomerComponent } from './active-customer.component';

describe('ActiveCustomerComponent', () => {
  let component: ActiveCustomerComponent;
  let fixture: ComponentFixture<ActiveCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
