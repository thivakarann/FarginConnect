import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTerminalViewComponent } from './entity-terminal-view.component';

describe('EntityTerminalViewComponent', () => {
  let component: EntityTerminalViewComponent;
  let fixture: ComponentFixture<EntityTerminalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityTerminalViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityTerminalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
