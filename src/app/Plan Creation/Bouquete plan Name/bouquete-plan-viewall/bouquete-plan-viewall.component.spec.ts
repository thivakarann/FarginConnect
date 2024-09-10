import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquetePlanViewallComponent } from './bouquete-plan-viewall.component';

describe('BouquetePlanViewallComponent', () => {
  let component: BouquetePlanViewallComponent;
  let fixture: ComponentFixture<BouquetePlanViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetePlanViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouquetePlanViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
