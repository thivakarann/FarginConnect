import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgsetupViewComponent } from './pgsetup-view.component';

describe('PgsetupViewComponent', () => {
  let component: PgsetupViewComponent;
  let fixture: ComponentFixture<PgsetupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgsetupViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgsetupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
