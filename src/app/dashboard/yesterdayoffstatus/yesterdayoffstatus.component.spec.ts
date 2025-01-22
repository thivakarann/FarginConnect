import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesterdayoffstatusComponent } from './yesterdayoffstatus.component';

describe('YesterdayoffstatusComponent', () => {
  let component: YesterdayoffstatusComponent;
  let fixture: ComponentFixture<YesterdayoffstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YesterdayoffstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YesterdayoffstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
