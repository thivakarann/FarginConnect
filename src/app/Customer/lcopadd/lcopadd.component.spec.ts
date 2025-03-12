import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcopaddComponent } from './lcopadd.component';

describe('LcopaddComponent', () => {
  let component: LcopaddComponent;
  let fixture: ComponentFixture<LcopaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LcopaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LcopaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
