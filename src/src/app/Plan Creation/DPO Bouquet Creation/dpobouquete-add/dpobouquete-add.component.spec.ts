import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPOBouqueteAddComponent } from './dpobouquete-add.component';

describe('DPOBouqueteAddComponent', () => {
  let component: DPOBouqueteAddComponent;
  let fixture: ComponentFixture<DPOBouqueteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DPOBouqueteAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DPOBouqueteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
