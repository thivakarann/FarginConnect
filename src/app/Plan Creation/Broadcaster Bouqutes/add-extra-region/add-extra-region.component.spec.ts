import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtraRegionComponent } from './add-extra-region.component';

describe('AddExtraRegionComponent', () => {
  let component: AddExtraRegionComponent;
  let fixture: ComponentFixture<AddExtraRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExtraRegionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExtraRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
