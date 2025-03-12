import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewpendingcustomerComponent } from './dashboardviewpendingcustomer.component';

describe('DashboardviewpendingcustomerComponent', () => {
  let component: DashboardviewpendingcustomerComponent;
  let fixture: ComponentFixture<DashboardviewpendingcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewpendingcustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewpendingcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
