import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouqutesAddComponent } from './bouqutes-add.component';

describe('BouqutesAddComponent', () => {
  let component: BouqutesAddComponent;
  let fixture: ComponentFixture<BouqutesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouqutesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouqutesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
