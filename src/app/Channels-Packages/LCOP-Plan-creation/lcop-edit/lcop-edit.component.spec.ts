import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcopEditComponent } from './lcop-edit.component';

describe('LcopEditComponent', () => {
  let component: LcopEditComponent;
  let fixture: ComponentFixture<LcopEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LcopEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LcopEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
