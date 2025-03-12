import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSetupboxactiveinactiveresponseComponent } from './bulk-setupboxactiveinactiveresponse.component';

describe('BulkSetupboxactiveinactiveresponseComponent', () => {
  let component: BulkSetupboxactiveinactiveresponseComponent;
  let fixture: ComponentFixture<BulkSetupboxactiveinactiveresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkSetupboxactiveinactiveresponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulkSetupboxactiveinactiveresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
