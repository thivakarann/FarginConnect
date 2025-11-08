import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityQrcodeComponent } from './entity-qrcode.component';

describe('EntityQrcodeComponent', () => {
  let component: EntityQrcodeComponent;
  let fixture: ComponentFixture<EntityQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityQrcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
