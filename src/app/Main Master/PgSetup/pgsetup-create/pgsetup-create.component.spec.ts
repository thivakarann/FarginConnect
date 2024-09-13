import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgsetupCreateComponent } from './pgsetup-create.component';

describe('PgsetupCreateComponent', () => {
  let component: PgsetupCreateComponent;
  let fixture: ComponentFixture<PgsetupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgsetupCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgsetupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
