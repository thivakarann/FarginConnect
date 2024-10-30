import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityViewallComponent } from './entity-viewall.component';

describe('EntityViewallComponent', () => {
  let component: EntityViewallComponent;
  let fixture: ComponentFixture<EntityViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
