import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCostViewallComponent } from './sms-cost-viewall.component';

describe('SmsCostViewallComponent', () => {
  let component: SmsCostViewallComponent;
  let fixture: ComponentFixture<SmsCostViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsCostViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsCostViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
