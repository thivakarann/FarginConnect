import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquetsRegionsviewComponent } from './bouquets-regionsview.component';

describe('BouquetsRegionsviewComponent', () => {
  let component: BouquetsRegionsviewComponent;
  let fixture: ComponentFixture<BouquetsRegionsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetsRegionsviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouquetsRegionsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
