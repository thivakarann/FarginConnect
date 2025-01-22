import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanParticularSetupboxComponent } from './plan-particular-setupbox.component';

describe('PlanParticularSetupboxComponent', () => {
  let component: PlanParticularSetupboxComponent;
  let fixture: ComponentFixture<PlanParticularSetupboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanParticularSetupboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanParticularSetupboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
