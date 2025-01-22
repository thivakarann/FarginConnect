import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnrewealfailureComponent } from './returnrewealfailure.component';

describe('ReturnrewealfailureComponent', () => {
  let component: ReturnrewealfailureComponent;
  let fixture: ComponentFixture<ReturnrewealfailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnrewealfailureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnrewealfailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
