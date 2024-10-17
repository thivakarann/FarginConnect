import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAutoDebitGetallComponent } from './entity-auto-debit-getall.component';

describe('EntityAutoDebitGetallComponent', () => {
  let component: EntityAutoDebitGetallComponent;
  let fixture: ComponentFixture<EntityAutoDebitGetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityAutoDebitGetallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityAutoDebitGetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
