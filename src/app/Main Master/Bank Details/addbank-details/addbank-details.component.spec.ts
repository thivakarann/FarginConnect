import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbankDetailsComponent } from './addbank-details.component';

describe('AddbankDetailsComponent', () => {
  let component: AddbankDetailsComponent;
  let fixture: ComponentFixture<AddbankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddbankDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddbankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
