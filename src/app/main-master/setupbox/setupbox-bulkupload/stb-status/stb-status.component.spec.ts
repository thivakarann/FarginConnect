import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StbStatusComponent } from './stb-status.component';

describe('StbStatusComponent', () => {
  let component: StbStatusComponent;
  let fixture: ComponentFixture<StbStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StbStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StbStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
