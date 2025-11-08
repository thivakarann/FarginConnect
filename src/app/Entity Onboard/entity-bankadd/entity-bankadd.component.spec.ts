import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityBankaddComponent } from './entity-bankadd.component';

describe('EntityBankaddComponent', () => {
  let component: EntityBankaddComponent;
  let fixture: ComponentFixture<EntityBankaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityBankaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityBankaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
