import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuesFailureComponent } from './dues-failure.component';

describe('DuesFailureComponent', () => {
  let component: DuesFailureComponent;
  let fixture: ComponentFixture<DuesFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuesFailureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuesFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
