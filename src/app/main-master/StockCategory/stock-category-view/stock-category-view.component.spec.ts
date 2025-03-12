import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCategoryViewComponent } from './stock-category-view.component';

describe('StockCategoryViewComponent', () => {
  let component: StockCategoryViewComponent;
  let fixture: ComponentFixture<StockCategoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockCategoryViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
