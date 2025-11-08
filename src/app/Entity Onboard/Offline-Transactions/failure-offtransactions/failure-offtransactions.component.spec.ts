import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureOfftransactionsComponent } from './failure-offtransactions.component';

describe('FailureOfftransactionsComponent', () => {
  let component: FailureOfftransactionsComponent;
  let fixture: ComponentFixture<FailureOfftransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailureOfftransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailureOfftransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
