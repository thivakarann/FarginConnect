import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySmsViewComponent } from './entity-sms-view.component';

describe('EntitySmsViewComponent', () => {
  let component: EntitySmsViewComponent;
  let fixture: ComponentFixture<EntitySmsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitySmsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntitySmsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
