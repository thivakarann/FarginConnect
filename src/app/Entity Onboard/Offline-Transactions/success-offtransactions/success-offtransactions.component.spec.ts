import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessOfftransactionsComponent } from './success-offtransactions.component';

describe('SuccessOfftransactionsComponent', () => {
  let component: SuccessOfftransactionsComponent;
  let fixture: ComponentFixture<SuccessOfftransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessOfftransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessOfftransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
