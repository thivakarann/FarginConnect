import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCOPviewallComponent } from './lcopviewall.component';

describe('LCOPviewallComponent', () => {
  let component: LCOPviewallComponent;
  let fixture: ComponentFixture<LCOPviewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LCOPviewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LCOPviewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
