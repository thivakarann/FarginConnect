import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineViewComponent } from './offline-view.component';

describe('OfflineViewComponent', () => {
  let component: OfflineViewComponent;
  let fixture: ComponentFixture<OfflineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfflineViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfflineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
