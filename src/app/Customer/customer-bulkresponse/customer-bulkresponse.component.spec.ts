import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBulkresponseComponent } from './customer-bulkresponse.component';

describe('CustomerBulkresponseComponent', () => {
  let component: CustomerBulkresponseComponent;
  let fixture: ComponentFixture<CustomerBulkresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerBulkresponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerBulkresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
