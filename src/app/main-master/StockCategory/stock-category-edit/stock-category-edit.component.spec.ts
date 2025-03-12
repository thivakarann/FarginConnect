import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCategoryEditComponent } from './stock-category-edit.component';

describe('StockCategoryEditComponent', () => {
  let component: StockCategoryEditComponent;
  let fixture: ComponentFixture<StockCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockCategoryEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
