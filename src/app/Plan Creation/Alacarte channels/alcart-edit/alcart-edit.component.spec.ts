import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcartEditComponent } from './alcart-edit.component';

describe('AlcartEditComponent', () => {
  let component: AlcartEditComponent;
  let fixture: ComponentFixture<AlcartEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlcartEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlcartEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
