import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransViewallComponent } from './customer-trans-viewall.component';

describe('CustomerTransViewallComponent', () => {
  let component: CustomerTransViewallComponent;
  let fixture: ComponentFixture<CustomerTransViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTransViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerTransViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
