import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePlanDetailsComponent } from './profile-plan-details.component';

describe('ProfilePlanDetailsComponent', () => {
  let component: ProfilePlanDetailsComponent;
  let fixture: ComponentFixture<ProfilePlanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePlanDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilePlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
