import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewholdticketComponent } from './dashboardviewholdticket.component';

describe('DashboardviewholdticketComponent', () => {
  let component: DashboardviewholdticketComponent;
  let fixture: ComponentFixture<DashboardviewholdticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewholdticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewholdticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
