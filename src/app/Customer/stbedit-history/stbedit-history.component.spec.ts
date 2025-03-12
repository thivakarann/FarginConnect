import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STBEditHistoryComponent } from './stbedit-history.component';

describe('STBEditHistoryComponent', () => {
  let component: STBEditHistoryComponent;
  let fixture: ComponentFixture<STBEditHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [STBEditHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(STBEditHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
