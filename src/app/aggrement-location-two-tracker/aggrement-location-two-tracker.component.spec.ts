import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementLocationTwoTrackerComponent } from './aggrement-location-two-tracker.component';

describe('AggrementLocationTwoTrackerComponent', () => {
  let component: AggrementLocationTwoTrackerComponent;
  let fixture: ComponentFixture<AggrementLocationTwoTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggrementLocationTwoTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggrementLocationTwoTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
