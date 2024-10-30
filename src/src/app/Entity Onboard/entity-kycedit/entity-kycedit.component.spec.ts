import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityKyceditComponent } from './entity-kycedit.component';

describe('EntityKyceditComponent', () => {
  let component: EntityKyceditComponent;
  let fixture: ComponentFixture<EntityKyceditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityKyceditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityKyceditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
