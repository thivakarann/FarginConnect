import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcategoryComponent } from './viewcategory.component';

describe('ViewcategoryComponent', () => {
  let component: ViewcategoryComponent;
  let fixture: ComponentFixture<ViewcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
