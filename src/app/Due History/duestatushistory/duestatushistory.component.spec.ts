import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuestatushistoryComponent } from './duestatushistory.component';

describe('DuestatushistoryComponent', () => {
  let component: DuestatushistoryComponent;
  let fixture: ComponentFixture<DuestatushistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuestatushistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuestatushistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
