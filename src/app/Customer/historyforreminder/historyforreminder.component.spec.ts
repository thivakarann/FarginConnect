import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryforreminderComponent } from './historyforreminder.component';

describe('HistoryforreminderComponent', () => {
  let component: HistoryforreminderComponent;
  let fixture: ComponentFixture<HistoryforreminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryforreminderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryforreminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
