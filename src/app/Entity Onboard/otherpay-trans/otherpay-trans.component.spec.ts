import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherpayTransComponent } from './otherpay-trans.component';

describe('OtherpayTransComponent', () => {
  let component: OtherpayTransComponent;
  let fixture: ComponentFixture<OtherpayTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherpayTransComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherpayTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
