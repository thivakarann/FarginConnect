import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquetenameEditComponent } from './bouquetename-edit.component';

describe('BouquetenameEditComponent', () => {
  let component: BouquetenameEditComponent;
  let fixture: ComponentFixture<BouquetenameEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquetenameEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouquetenameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
