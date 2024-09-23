import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtraChannelsComponent } from './add-extra-channels.component';

describe('AddExtraChannelsComponent', () => {
  let component: AddExtraChannelsComponent;
  let fixture: ComponentFixture<AddExtraChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExtraChannelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExtraChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
