import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOnboardinfoComponent } from './view-onboardinfo.component';

describe('ViewOnboardinfoComponent', () => {
  let component: ViewOnboardinfoComponent;
  let fixture: ComponentFixture<ViewOnboardinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOnboardinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOnboardinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
