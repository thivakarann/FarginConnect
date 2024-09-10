import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquateNameAddComponent } from './bouquate-name-add.component';

describe('BouquateNameAddComponent', () => {
  let component: BouquateNameAddComponent;
  let fixture: ComponentFixture<BouquateNameAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouquateNameAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouquateNameAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
