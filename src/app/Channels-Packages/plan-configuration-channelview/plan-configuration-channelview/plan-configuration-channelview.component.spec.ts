import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanConfigurationChannelviewComponent } from './plan-configuration-channelview.component';

describe('PlanConfigurationChannelviewComponent', () => {
  let component: PlanConfigurationChannelviewComponent;
  let fixture: ComponentFixture<PlanConfigurationChannelviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanConfigurationChannelviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanConfigurationChannelviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
