import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTerminalEditComponent } from './entity-terminal-edit.component';

describe('EntityTerminalEditComponent', () => {
  let component: EntityTerminalEditComponent;
  let fixture: ComponentFixture<EntityTerminalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityTerminalEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityTerminalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
