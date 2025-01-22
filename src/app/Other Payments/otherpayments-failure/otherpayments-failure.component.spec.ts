import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherpaymentsFailureComponent } from './otherpayments-failure.component';

describe('OtherpaymentsFailureComponent', () => {
  let component: OtherpaymentsFailureComponent;
  let fixture: ComponentFixture<OtherpaymentsFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherpaymentsFailureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherpaymentsFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
