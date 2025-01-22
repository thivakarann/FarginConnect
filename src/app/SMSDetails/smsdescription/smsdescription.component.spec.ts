import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSDescriptionComponent } from './smsdescription.component';

describe('SMSDescriptionComponent', () => {
  let component: SMSDescriptionComponent;
  let fixture: ComponentFixture<SMSDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SMSDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SMSDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
