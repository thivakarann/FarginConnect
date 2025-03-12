import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewfaultyComponent } from './dashboardviewfaulty.component';

describe('DashboardviewfaultyComponent', () => {
  let component: DashboardviewfaultyComponent;
  let fixture: ComponentFixture<DashboardviewfaultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewfaultyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewfaultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
