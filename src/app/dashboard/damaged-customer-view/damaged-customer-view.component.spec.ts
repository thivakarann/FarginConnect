import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagedCustomerViewComponent } from './damaged-customer-view.component';

describe('DamagedCustomerViewComponent', () => {
  let component: DamagedCustomerViewComponent;
  let fixture: ComponentFixture<DamagedCustomerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DamagedCustomerViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DamagedCustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
