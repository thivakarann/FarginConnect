import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcartViewComponent } from './alcart-view.component';

describe('AlcartViewComponent', () => {
  let component: AlcartViewComponent;
  let fixture: ComponentFixture<AlcartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlcartViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlcartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
