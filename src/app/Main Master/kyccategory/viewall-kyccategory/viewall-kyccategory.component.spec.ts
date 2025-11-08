import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallKyccategoryComponent } from './viewall-kyccategory.component';

describe('ViewallKyccategoryComponent', () => {
  let component: ViewallKyccategoryComponent;
  let fixture: ComponentFixture<ViewallKyccategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewallKyccategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewallKyccategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
