import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouqutesRegionComponent } from './bouqutes-region.component';

describe('BouqutesRegionComponent', () => {
  let component: BouqutesRegionComponent;
  let fixture: ComponentFixture<BouqutesRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouqutesRegionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouqutesRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
