import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherpaymentsViewallComponent } from './otherpayments-viewall.component';

describe('OtherpaymentsViewallComponent', () => {
  let component: OtherpaymentsViewallComponent;
  let fixture: ComponentFixture<OtherpaymentsViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherpaymentsViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherpaymentsViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
