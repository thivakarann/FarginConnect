import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouqutesRegioneditComponent } from './bouqutes-regionedit.component';

describe('BouqutesRegioneditComponent', () => {
  let component: BouqutesRegioneditComponent;
  let fixture: ComponentFixture<BouqutesRegioneditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouqutesRegioneditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouqutesRegioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
