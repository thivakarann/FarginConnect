import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcartAddComponent } from './alcart-add.component';

describe('AlcartAddComponent', () => {
  let component: AlcartAddComponent;
  let fixture: ComponentFixture<AlcartAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlcartAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlcartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
