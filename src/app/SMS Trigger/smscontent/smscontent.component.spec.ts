import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSContentComponent } from './smscontent.component';

describe('SMSContentComponent', () => {
  let component: SMSContentComponent;
  let fixture: ComponentFixture<SMSContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SMSContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SMSContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
