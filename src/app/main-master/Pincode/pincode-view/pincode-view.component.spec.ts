import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeViewComponent } from './pincode-view.component';

describe('PincodeViewComponent', () => {
  let component: PincodeViewComponent;
  let fixture: ComponentFixture<PincodeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PincodeViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PincodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
