import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTransactionComponent } from './entity-transaction.component';

describe('EntityTransactionComponent', () => {
  let component: EntityTransactionComponent;
  let fixture: ComponentFixture<EntityTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
