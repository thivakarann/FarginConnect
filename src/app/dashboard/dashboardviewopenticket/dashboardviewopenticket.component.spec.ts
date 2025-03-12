import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewopenticketComponent } from './dashboardviewopenticket.component';

describe('DashboardviewopenticketComponent', () => {
  let component: DashboardviewopenticketComponent;
  let fixture: ComponentFixture<DashboardviewopenticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewopenticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewopenticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
