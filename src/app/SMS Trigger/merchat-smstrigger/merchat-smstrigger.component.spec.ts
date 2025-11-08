import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchatSMSTriggerComponent } from './merchat-smstrigger.component';

describe('MerchatSMSTriggerComponent', () => {
  let component: MerchatSMSTriggerComponent;
  let fixture: ComponentFixture<MerchatSMSTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchatSMSTriggerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchatSMSTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
