import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcopPlanViewComponent } from './lcop-plan-view.component';

describe('LcopPlanViewComponent', () => {
  let component: LcopPlanViewComponent;
  let fixture: ComponentFixture<LcopPlanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LcopPlanViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LcopPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
