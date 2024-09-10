import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcartLogoViewComponent } from './alcart-logo-view.component';

describe('AlcartLogoViewComponent', () => {
  let component: AlcartLogoViewComponent;
  let fixture: ComponentFixture<AlcartLogoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlcartLogoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlcartLogoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
