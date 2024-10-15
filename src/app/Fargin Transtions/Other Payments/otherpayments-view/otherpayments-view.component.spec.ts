import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherpaymentsViewComponent } from './otherpayments-view.component';

describe('OtherpaymentsViewComponent', () => {
  let component: OtherpaymentsViewComponent;
  let fixture: ComponentFixture<OtherpaymentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherpaymentsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherpaymentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
