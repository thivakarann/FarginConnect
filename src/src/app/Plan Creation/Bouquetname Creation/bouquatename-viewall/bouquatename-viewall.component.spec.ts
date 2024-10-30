import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquatenameViewallComponent } from './bouquatename-viewall.component';

describe('BouquatenameViewallComponent', () => {
  let component: BouquatenameViewallComponent;
  let fixture: ComponentFixture<BouquatenameViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquatenameViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouquatenameViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
