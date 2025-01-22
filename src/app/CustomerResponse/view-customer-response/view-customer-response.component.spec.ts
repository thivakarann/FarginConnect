import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerResponseComponent } from './view-customer-response.component';

describe('ViewCustomerResponseComponent', () => {
  let component: ViewCustomerResponseComponent;
  let fixture: ComponentFixture<ViewCustomerResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCustomerResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCustomerResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
