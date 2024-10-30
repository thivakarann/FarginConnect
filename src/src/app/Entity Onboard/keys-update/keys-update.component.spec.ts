import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysUpdateComponent } from './keys-update.component';

describe('KeysUpdateComponent', () => {
  let component: KeysUpdateComponent;
  let fixture: ComponentFixture<KeysUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeysUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeysUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
