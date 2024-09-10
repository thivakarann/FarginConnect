import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlacarteViewallComponent } from './alacarte-viewall.component';

describe('AlacarteViewallComponent', () => {
  let component: AlacarteViewallComponent;
  let fixture: ComponentFixture<AlacarteViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlacarteViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlacarteViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
