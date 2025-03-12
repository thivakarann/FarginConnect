import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewfreeComponent } from './dashboardviewfree.component';

describe('DashboardviewfreeComponent', () => {
  let component: DashboardviewfreeComponent;
  let fixture: ComponentFixture<DashboardviewfreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewfreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewfreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
