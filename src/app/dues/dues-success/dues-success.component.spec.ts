import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuesSuccessComponent } from './dues-success.component';

describe('DuesSuccessComponent', () => {
  let component: DuesSuccessComponent;
  let fixture: ComponentFixture<DuesSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuesSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuesSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
