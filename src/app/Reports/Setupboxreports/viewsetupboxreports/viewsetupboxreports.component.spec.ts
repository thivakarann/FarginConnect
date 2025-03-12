import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsetupboxreportsComponent } from './viewsetupboxreports.component';

describe('ViewsetupboxreportsComponent', () => {
  let component: ViewsetupboxreportsComponent;
  let fixture: ComponentFixture<ViewsetupboxreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewsetupboxreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewsetupboxreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
