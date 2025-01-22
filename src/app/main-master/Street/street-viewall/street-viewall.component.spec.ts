import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetViewallComponent } from './street-viewall.component';

describe('StreetViewallComponent', () => {
  let component: StreetViewallComponent;
  let fixture: ComponentFixture<StreetViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreetViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreetViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
