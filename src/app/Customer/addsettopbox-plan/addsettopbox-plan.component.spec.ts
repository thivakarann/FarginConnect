import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsettopboxPlanComponent } from './addsettopbox-plan.component';

describe('AddsettopboxPlanComponent', () => {
  let component: AddsettopboxPlanComponent;
  let fixture: ComponentFixture<AddsettopboxPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddsettopboxPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddsettopboxPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
