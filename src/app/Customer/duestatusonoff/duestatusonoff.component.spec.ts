import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuestatusonoffComponent } from './duestatusonoff.component';

describe('DuestatusonoffComponent', () => {
  let component: DuestatusonoffComponent;
  let fixture: ComponentFixture<DuestatusonoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuestatusonoffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuestatusonoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
