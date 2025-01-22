import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewduesreportsComponent } from './viewduesreports.component';

describe('ViewduesreportsComponent', () => {
  let component: ViewduesreportsComponent;
  let fixture: ComponentFixture<ViewduesreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewduesreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewduesreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
