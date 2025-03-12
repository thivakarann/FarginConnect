import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSolutionsComponent } from './customer-solutions.component';

describe('CustomerSolutionsComponent', () => {
  let component: CustomerSolutionsComponent;
  let fixture: ComponentFixture<CustomerSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSolutionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
