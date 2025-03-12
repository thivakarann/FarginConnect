import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STBHistoryComponent } from './stbhistory.component';

describe('STBHistoryComponent', () => {
  let component: STBHistoryComponent;
  let fixture: ComponentFixture<STBHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [STBHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(STBHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
