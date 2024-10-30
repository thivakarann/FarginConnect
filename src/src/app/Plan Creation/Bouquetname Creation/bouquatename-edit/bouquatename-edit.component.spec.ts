import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquatenameEditComponent } from './bouquatename-edit.component';

describe('BouquatenameEditComponent', () => {
  let component: BouquatenameEditComponent;
  let fixture: ComponentFixture<BouquatenameEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquatenameEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouquatenameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
