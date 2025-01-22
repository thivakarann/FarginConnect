import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelconfigurationSingleviewComponent } from './channelconfiguration-singleview.component';

describe('ChannelconfigurationSingleviewComponent', () => {
  let component: ChannelconfigurationSingleviewComponent;
  let fixture: ComponentFixture<ChannelconfigurationSingleviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChannelconfigurationSingleviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChannelconfigurationSingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
