import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusduelogsbymerchantComponent } from './cusduelogsbymerchant.component';

describe('CusduelogsbymerchantComponent', () => {
  let component: CusduelogsbymerchantComponent;
  let fixture: ComponentFixture<CusduelogsbymerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CusduelogsbymerchantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CusduelogsbymerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
