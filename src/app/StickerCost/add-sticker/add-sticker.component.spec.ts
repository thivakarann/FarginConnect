import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStickerComponent } from './add-sticker.component';

describe('AddStickerComponent', () => {
  let component: AddStickerComponent;
  let fixture: ComponentFixture<AddStickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
