import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmerchantComponent } from './viewmerchant.component';

describe('ViewmerchantComponent', () => {
  let component: ViewmerchantComponent;
  let fixture: ComponentFixture<ViewmerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewmerchantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewmerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
