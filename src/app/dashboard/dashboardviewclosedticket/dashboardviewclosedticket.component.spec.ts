import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardviewclosedticketComponent } from './dashboardviewclosedticket.component';

describe('DashboardviewclosedticketComponent', () => {
  let component: DashboardviewclosedticketComponent;
  let fixture: ComponentFixture<DashboardviewclosedticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardviewclosedticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardviewclosedticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
