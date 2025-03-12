import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewactivecustomerComponent } from './dashboardviewactivecustomer.component';

describe('DashboardviewactivecustomerComponent', () => {
  let component: DashboardviewactivecustomerComponent;
  let fixture: ComponentFixture<DashboardviewactivecustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewactivecustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewactivecustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
