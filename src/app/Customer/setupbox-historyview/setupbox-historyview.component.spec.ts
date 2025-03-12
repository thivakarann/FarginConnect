import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupboxHistoryviewComponent } from './setupbox-historyview.component';

describe('SetupboxHistoryviewComponent', () => {
  let component: SetupboxHistoryviewComponent;
  let fixture: ComponentFixture<SetupboxHistoryviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupboxHistoryviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupboxHistoryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
