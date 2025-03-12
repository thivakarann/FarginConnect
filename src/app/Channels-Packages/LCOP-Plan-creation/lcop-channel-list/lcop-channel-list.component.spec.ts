import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcopChannelListComponent } from './lcop-channel-list.component';

describe('LcopChannelListComponent', () => {
  let component: LcopChannelListComponent;
  let fixture: ComponentFixture<LcopChannelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LcopChannelListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LcopChannelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
