import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDiscriptionComponent } from './customer-discription.component';

describe('CustomerDiscriptionComponent', () => {
  let component: CustomerDiscriptionComponent;
  let fixture: ComponentFixture<CustomerDiscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDiscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDiscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
