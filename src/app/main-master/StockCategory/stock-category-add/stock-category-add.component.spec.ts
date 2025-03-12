import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCategoryAddComponent } from './stock-category-add.component';

describe('StockCategoryAddComponent', () => {
  let component: StockCategoryAddComponent;
  let fixture: ComponentFixture<StockCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockCategoryAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
