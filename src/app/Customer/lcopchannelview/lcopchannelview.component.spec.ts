import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcopchannelviewComponent } from './lcopchannelview.component';

describe('LcopchannelviewComponent', () => {
  let component: LcopchannelviewComponent;
  let fixture: ComponentFixture<LcopchannelviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LcopchannelviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LcopchannelviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
