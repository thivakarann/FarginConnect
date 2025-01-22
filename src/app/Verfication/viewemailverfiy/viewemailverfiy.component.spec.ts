import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewemailverfiyComponent } from './viewemailverfiy.component';

describe('ViewemailverfiyComponent', () => {
  let component: ViewemailverfiyComponent;
  let fixture: ComponentFixture<ViewemailverfiyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewemailverfiyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewemailverfiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
