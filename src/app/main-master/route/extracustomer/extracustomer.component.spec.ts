import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtracustomerComponent } from './extracustomer.component';

describe('ExtracustomerComponent', () => {
  let component: ExtracustomerComponent;
  let fixture: ComponentFixture<ExtracustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtracustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtracustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
