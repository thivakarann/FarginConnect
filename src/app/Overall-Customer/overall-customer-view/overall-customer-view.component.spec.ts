import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallCustomerViewComponent } from './overall-customer-view.component';

describe('OverallCustomerViewComponent', () => {
  let component: OverallCustomerViewComponent;
  let fixture: ComponentFixture<OverallCustomerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverallCustomerViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverallCustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
