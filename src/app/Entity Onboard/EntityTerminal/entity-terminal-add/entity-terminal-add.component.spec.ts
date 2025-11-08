import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTerminalAddComponent } from './entity-terminal-add.component';

describe('EntityTerminalAddComponent', () => {
  let component: EntityTerminalAddComponent;
  let fixture: ComponentFixture<EntityTerminalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityTerminalAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityTerminalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
