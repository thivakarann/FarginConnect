import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquetenameAddComponent } from './bouquetename-add.component';

describe('BouquetenameAddComponent', () => {
  let component: BouquetenameAddComponent;
  let fixture: ComponentFixture<BouquetenameAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetenameAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouquetenameAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
