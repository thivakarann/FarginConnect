import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAutoDebitByIdComponent } from './entity-auto-debit-by-id.component';

describe('EntityAutoDebitByIdComponent', () => {
  let component: EntityAutoDebitByIdComponent;
  let fixture: ComponentFixture<EntityAutoDebitByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityAutoDebitByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityAutoDebitByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
