import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedCustomerViewComponent } from './booked-customer-view.component';

describe('BookedCustomerViewComponent', () => {
  let component: BookedCustomerViewComponent;
  let fixture: ComponentFixture<BookedCustomerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookedCustomerViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookedCustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
