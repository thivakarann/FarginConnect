import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureForAdditionalComponent } from './failure-for-additional.component';

describe('FailureForAdditionalComponent', () => {
  let component: FailureForAdditionalComponent;
  let fixture: ComponentFixture<FailureForAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailureForAdditionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailureForAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
