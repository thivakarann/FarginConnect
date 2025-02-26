import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityOfflineviewComponent } from './entity-offlineview.component';

describe('EntityOfflineviewComponent', () => {
  let component: EntityOfflineviewComponent;
  let fixture: ComponentFixture<EntityOfflineviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityOfflineviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityOfflineviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
