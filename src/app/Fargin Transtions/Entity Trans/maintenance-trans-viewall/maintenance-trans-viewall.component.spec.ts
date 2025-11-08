import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceTransViewallComponent } from './maintenance-trans-viewall.component';

describe('MaintenanceTransViewallComponent', () => {
  let component: MaintenanceTransViewallComponent;
  let fixture: ComponentFixture<MaintenanceTransViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaintenanceTransViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenanceTransViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
