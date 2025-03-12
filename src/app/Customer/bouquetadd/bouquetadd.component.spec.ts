import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquetaddComponent } from './bouquetadd.component';

describe('BouquetaddComponent', () => {
  let component: BouquetaddComponent;
  let fixture: ComponentFixture<BouquetaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouquetaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
