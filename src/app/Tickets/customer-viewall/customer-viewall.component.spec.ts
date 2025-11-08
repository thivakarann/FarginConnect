import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewallComponent } from './customer-viewall.component';

describe('CustomerViewallComponent', () => {
  let component: CustomerViewallComponent;
  let fixture: ComponentFixture<CustomerViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
