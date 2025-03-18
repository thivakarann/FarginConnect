import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineDetailsComponent } from './offline-details.component';

describe('OfflineDetailsComponent', () => {
  let component: OfflineDetailsComponent;
  let fixture: ComponentFixture<OfflineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfflineDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfflineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
