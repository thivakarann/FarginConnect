import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityLoginpageComponent } from './entity-loginpage.component';

describe('EntityLoginpageComponent', () => {
  let component: EntityLoginpageComponent;
  let fixture: ComponentFixture<EntityLoginpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityLoginpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityLoginpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
