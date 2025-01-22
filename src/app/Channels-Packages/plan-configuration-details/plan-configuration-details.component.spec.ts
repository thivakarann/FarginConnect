import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanConfigurationDetailsComponent } from './plan-configuration-details.component';

describe('PlanConfigurationDetailsComponent', () => {
  let component: PlanConfigurationDetailsComponent;
  let fixture: ComponentFixture<PlanConfigurationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanConfigurationDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanConfigurationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
