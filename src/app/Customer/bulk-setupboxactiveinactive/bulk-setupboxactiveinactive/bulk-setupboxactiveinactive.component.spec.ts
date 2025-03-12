import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSetupboxactiveinactiveComponent } from './bulk-setupboxactiveinactive.component';

describe('BulkSetupboxactiveinactiveComponent', () => {
  let component: BulkSetupboxactiveinactiveComponent;
  let fixture: ComponentFixture<BulkSetupboxactiveinactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkSetupboxactiveinactiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulkSetupboxactiveinactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
