import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySmsViewallComponent } from './entity-sms-viewall.component';

describe('EntitySmsViewallComponent', () => {
  let component: EntitySmsViewallComponent;
  let fixture: ComponentFixture<EntitySmsViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitySmsViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntitySmsViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
