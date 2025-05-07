import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerHistoryComponent } from './sticker-history.component';

describe('StickerHistoryComponent', () => {
  let component: StickerHistoryComponent;
  let fixture: ComponentFixture<StickerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickerHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StickerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
