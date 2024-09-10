import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPOViewallComponent } from './dpoviewall.component';

describe('DPOViewallComponent', () => {
  let component: DPOViewallComponent;
  let fixture: ComponentFixture<DPOViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DPOViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DPOViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
