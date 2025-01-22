import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalPayviewComponent } from './additional-payview.component';

describe('AdditionalPayviewComponent', () => {
  let component: AdditionalPayviewComponent;
  let fixture: ComponentFixture<AdditionalPayviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalPayviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionalPayviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
