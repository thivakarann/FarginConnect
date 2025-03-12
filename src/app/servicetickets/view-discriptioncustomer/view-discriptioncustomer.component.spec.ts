import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiscriptioncustomerComponent } from './view-discriptioncustomer.component';

describe('ViewDiscriptioncustomerComponent', () => {
  let component: ViewDiscriptioncustomerComponent;
  let fixture: ComponentFixture<ViewDiscriptioncustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDiscriptioncustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDiscriptioncustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
