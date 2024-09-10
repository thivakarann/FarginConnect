import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouqutesViewComponent } from './bouqutes-view.component';

describe('BouqutesViewComponent', () => {
  let component: BouqutesViewComponent;
  let fixture: ComponentFixture<BouqutesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouqutesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouqutesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
