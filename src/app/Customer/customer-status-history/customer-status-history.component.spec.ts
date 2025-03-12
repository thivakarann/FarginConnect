import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStatusHistoryComponent } from './customer-status-history.component';

describe('CustomerStatusHistoryComponent', () => {
  let component: CustomerStatusHistoryComponent;
  let fixture: ComponentFixture<CustomerStatusHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerStatusHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerStatusHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
