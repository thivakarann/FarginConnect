import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewactiveempolyeeComponent } from './dashboardviewactiveempolyee.component';

describe('DashboardviewactiveempolyeeComponent', () => {
  let component: DashboardviewactiveempolyeeComponent;
  let fixture: ComponentFixture<DashboardviewactiveempolyeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewactiveempolyeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewactiveempolyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
