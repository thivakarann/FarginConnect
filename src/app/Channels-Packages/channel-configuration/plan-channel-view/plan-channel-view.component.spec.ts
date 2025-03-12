import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanChannelViewComponent } from './plan-channel-view.component';

describe('PlanChannelViewComponent', () => {
  let component: PlanChannelViewComponent;
  let fixture: ComponentFixture<PlanChannelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanChannelViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanChannelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
