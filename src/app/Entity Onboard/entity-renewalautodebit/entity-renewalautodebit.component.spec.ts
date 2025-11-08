import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityRenewalautodebitComponent } from './entity-renewalautodebit.component';

describe('EntityRenewalautodebitComponent', () => {
  let component: EntityRenewalautodebitComponent;
  let fixture: ComponentFixture<EntityRenewalautodebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityRenewalautodebitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityRenewalautodebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
