import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrefundComponent } from './viewrefund.component';

describe('ViewrefundComponent', () => {
  let component: ViewrefundComponent;
  let fixture: ComponentFixture<ViewrefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewrefundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewrefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
