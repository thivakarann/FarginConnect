import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnfailureComponent } from './returnfailure.component';

describe('ReturnfailureComponent', () => {
  let component: ReturnfailureComponent;
  let fixture: ComponentFixture<ReturnfailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnfailureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnfailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
