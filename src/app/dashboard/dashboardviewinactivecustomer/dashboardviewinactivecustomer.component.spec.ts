import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewinactivecustomerComponent } from './dashboardviewinactivecustomer.component';

describe('DashboardviewinactivecustomerComponent', () => {
  let component: DashboardviewinactivecustomerComponent;
  let fixture: ComponentFixture<DashboardviewinactivecustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewinactivecustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewinactivecustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
