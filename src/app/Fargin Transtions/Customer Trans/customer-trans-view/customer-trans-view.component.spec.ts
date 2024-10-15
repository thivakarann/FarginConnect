import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransViewComponent } from './customer-trans-view.component';

describe('CustomerTransViewComponent', () => {
  let component: CustomerTransViewComponent;
  let fixture: ComponentFixture<CustomerTransViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTransViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerTransViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
