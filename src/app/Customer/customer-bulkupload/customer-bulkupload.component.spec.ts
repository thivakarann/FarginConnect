import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBulkuploadComponent } from './customer-bulkupload.component';

describe('CustomerBulkuploadComponent', () => {
  let component: CustomerBulkuploadComponent;
  let fixture: ComponentFixture<CustomerBulkuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerBulkuploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerBulkuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
