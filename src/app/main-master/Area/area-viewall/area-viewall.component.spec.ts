import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaViewallComponent } from './area-viewall.component';

describe('AreaViewallComponent', () => {
  let component: AreaViewallComponent;
  let fixture: ComponentFixture<AreaViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
