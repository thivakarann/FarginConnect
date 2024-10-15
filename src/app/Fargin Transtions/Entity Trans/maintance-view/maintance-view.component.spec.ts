import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintanceViewComponent } from './maintance-view.component';

describe('MaintanceViewComponent', () => {
  let component: MaintanceViewComponent;
  let fixture: ComponentFixture<MaintanceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaintanceViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
