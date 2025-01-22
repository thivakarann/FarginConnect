import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsuccessComponent } from './returnsuccess.component';

describe('ReturnsuccessComponent', () => {
  let component: ReturnsuccessComponent;
  let fixture: ComponentFixture<ReturnsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnsuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
