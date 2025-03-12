import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetupboxPlanComponent } from './add-setupbox-plan.component';

describe('AddSetupboxPlanComponent', () => {
  let component: AddSetupboxPlanComponent;
  let fixture: ComponentFixture<AddSetupboxPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSetupboxPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSetupboxPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
