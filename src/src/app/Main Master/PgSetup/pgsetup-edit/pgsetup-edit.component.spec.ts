import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgsetupEditComponent } from './pgsetup-edit.component';

describe('PgsetupEditComponent', () => {
  let component: PgsetupEditComponent;
  let fixture: ComponentFixture<PgsetupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgsetupEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgsetupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
