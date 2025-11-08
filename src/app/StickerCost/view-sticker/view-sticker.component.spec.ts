import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStickerComponent } from './view-sticker.component';

describe('ViewStickerComponent', () => {
  let component: ViewStickerComponent;
  let fixture: ComponentFixture<ViewStickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewStickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
