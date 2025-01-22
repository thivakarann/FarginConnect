import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessForAdditionalComponent } from './success-for-additional.component';

describe('SuccessForAdditionalComponent', () => {
  let component: SuccessForAdditionalComponent;
  let fixture: ComponentFixture<SuccessForAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessForAdditionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessForAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
