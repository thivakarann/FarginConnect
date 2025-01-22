import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewinactiveemployeeComponent } from './dashboardviewinactiveemployee.component';

describe('DashboardviewinactiveemployeeComponent', () => {
  let component: DashboardviewinactiveemployeeComponent;
  let fixture: ComponentFixture<DashboardviewinactiveemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewinactiveemployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewinactiveemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
