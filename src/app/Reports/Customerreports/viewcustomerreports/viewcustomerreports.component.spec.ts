import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcustomerreportsComponent } from './viewcustomerreports.component';

describe('ViewcustomerreportsComponent', () => {
  let component: ViewcustomerreportsComponent;
  let fixture: ComponentFixture<ViewcustomerreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewcustomerreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewcustomerreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
