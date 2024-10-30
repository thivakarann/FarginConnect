import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCustomersViewComponent } from './entity-customers-view.component';

describe('EntityCustomersViewComponent', () => {
  let component: EntityCustomersViewComponent;
  let fixture: ComponentFixture<EntityCustomersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityCustomersViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
