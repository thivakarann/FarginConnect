import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCustomersViewAllComponent } from './entity-customers-view-all.component';

describe('EntityCustomersViewAllComponent', () => {
  let component: EntityCustomersViewAllComponent;
  let fixture: ComponentFixture<EntityCustomersViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityCustomersViewAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityCustomersViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
