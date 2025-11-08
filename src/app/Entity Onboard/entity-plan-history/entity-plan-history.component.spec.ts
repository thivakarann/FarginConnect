import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPlanHistoryComponent } from './entity-plan-history.component';

describe('EntityPlanHistoryComponent', () => {
  let component: EntityPlanHistoryComponent;
  let fixture: ComponentFixture<EntityPlanHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityPlanHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityPlanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
