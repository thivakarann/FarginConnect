import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryViewallComponent } from './category-viewall.component';

describe('CategoryViewallComponent', () => {
  let component: CategoryViewallComponent;
  let fixture: ComponentFixture<CategoryViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
