import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCOPAddComponent } from './lcopadd.component';

describe('LCOPAddComponent', () => {
  let component: LCOPAddComponent;
  let fixture: ComponentFixture<LCOPAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LCOPAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LCOPAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
