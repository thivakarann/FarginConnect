import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceotherpayViewComponent } from './maintenanceotherpay-view.component';

describe('MaintenanceotherpayViewComponent', () => {
  let component: MaintenanceotherpayViewComponent;
  let fixture: ComponentFixture<MaintenanceotherpayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaintenanceotherpayViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenanceotherpayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
