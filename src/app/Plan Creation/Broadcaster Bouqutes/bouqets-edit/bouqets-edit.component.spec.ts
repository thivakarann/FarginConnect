import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouqetsEditComponent } from './bouqets-edit.component';

describe('BouqetsEditComponent', () => {
  let component: BouqetsEditComponent;
  let fixture: ComponentFixture<BouqetsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BouqetsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouqetsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
