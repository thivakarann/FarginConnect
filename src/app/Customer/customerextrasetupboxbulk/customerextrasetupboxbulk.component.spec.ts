import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerextrasetupboxbulkComponent } from './customerextrasetupboxbulk.component';

describe('CustomerextrasetupboxbulkComponent', () => {
  let component: CustomerextrasetupboxbulkComponent;
  let fixture: ComponentFixture<CustomerextrasetupboxbulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerextrasetupboxbulkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerextrasetupboxbulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
