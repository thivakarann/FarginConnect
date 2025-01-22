import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprivacyComponent } from './viewprivacy.component';

describe('ViewprivacyComponent', () => {
  let component: ViewprivacyComponent;
  let fixture: ComponentFixture<ViewprivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewprivacyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewprivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
