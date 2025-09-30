import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsViewallComponent } from './vendors-viewall.component';

describe('VendorsViewallComponent', () => {
  let component: VendorsViewallComponent;
  let fixture: ComponentFixture<VendorsViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorsViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorsViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
