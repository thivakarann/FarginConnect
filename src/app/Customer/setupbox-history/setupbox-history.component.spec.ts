import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupboxHistoryComponent } from './setupbox-history.component';

describe('SetupboxHistoryComponent', () => {
  let component: SetupboxHistoryComponent;
  let fixture: ComponentFixture<SetupboxHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupboxHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupboxHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
