import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesterdayonoffstatusComponent } from './yesterdayonoffstatus.component';

describe('YesterdayonoffstatusComponent', () => {
  let component: YesterdayonoffstatusComponent;
  let fixture: ComponentFixture<YesterdayonoffstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YesterdayonoffstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YesterdayonoffstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
