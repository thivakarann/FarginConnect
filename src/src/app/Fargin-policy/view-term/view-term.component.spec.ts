import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTermComponent } from './view-term.component';

describe('ViewTermComponent', () => {
  let component: ViewTermComponent;
  let fixture: ComponentFixture<ViewTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTermComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
