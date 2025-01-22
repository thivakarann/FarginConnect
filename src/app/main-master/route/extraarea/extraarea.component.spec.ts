import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraareaComponent } from './extraarea.component';

describe('ExtraareaComponent', () => {
  let component: ExtraareaComponent;
  let fixture: ComponentFixture<ExtraareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtraareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtraareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
