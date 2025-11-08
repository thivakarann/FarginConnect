import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSTriggerLogsComponent } from './smstrigger-logs.component';

describe('SMSTriggerLogsComponent', () => {
  let component: SMSTriggerLogsComponent;
  let fixture: ComponentFixture<SMSTriggerLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SMSTriggerLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SMSTriggerLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
