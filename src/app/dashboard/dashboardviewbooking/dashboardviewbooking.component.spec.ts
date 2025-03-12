import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewbookingComponent } from './dashboardviewbooking.component';

describe('DashboardviewbookingComponent', () => {
  let component: DashboardviewbookingComponent;
  let fixture: ComponentFixture<DashboardviewbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewbookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
