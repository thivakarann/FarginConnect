import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketraiseComponent } from './customer-ticketraise.component';

describe('CustomerTicketraiseComponent', () => {
  let component: CustomerTicketraiseComponent;
  let fixture: ComponentFixture<CustomerTicketraiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTicketraiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerTicketraiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
