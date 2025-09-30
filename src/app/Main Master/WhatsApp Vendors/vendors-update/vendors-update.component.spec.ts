import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsUpdateComponent } from './vendors-update.component';

describe('VendorsUpdateComponent', () => {
  let component: VendorsUpdateComponent;
  let fixture: ComponentFixture<VendorsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorsUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
