import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityBankeditComponent } from './entity-bankedit.component';

describe('EntityBankeditComponent', () => {
  let component: EntityBankeditComponent;
  let fixture: ComponentFixture<EntityBankeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityBankeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityBankeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
