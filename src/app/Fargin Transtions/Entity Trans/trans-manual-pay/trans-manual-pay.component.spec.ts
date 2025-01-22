import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransManualPayComponent } from './trans-manual-pay.component';

describe('TransManualPayComponent', () => {
  let component: TransManualPayComponent;
  let fixture: ComponentFixture<TransManualPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransManualPayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransManualPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
