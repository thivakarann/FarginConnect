import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementLocationTrackerComponent } from './aggrement-location-tracker.component';

describe('AggrementLocationTrackerComponent', () => {
  let component: AggrementLocationTrackerComponent;
  let fixture: ComponentFixture<AggrementLocationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggrementLocationTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggrementLocationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
