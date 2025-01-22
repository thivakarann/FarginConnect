import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanConfigurationComponent } from './plan-configuration.component';

describe('PlanConfigurationComponent', () => {
  let component: PlanConfigurationComponent;
  let fixture: ComponentFixture<PlanConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
