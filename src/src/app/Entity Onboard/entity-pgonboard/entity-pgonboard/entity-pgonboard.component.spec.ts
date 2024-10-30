import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPgonboardComponent } from './entity-pgonboard.component';

describe('EntityPgonboardComponent', () => {
  let component: EntityPgonboardComponent;
  let fixture: ComponentFixture<EntityPgonboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityPgonboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityPgonboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
