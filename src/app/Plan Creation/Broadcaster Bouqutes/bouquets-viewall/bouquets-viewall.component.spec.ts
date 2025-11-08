import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquetsViewallComponent } from './bouquets-viewall.component';

describe('BouquetsViewallComponent', () => {
  let component: BouquetsViewallComponent;
  let fixture: ComponentFixture<BouquetsViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetsViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouquetsViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
