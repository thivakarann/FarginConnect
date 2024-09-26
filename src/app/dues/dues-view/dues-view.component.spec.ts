import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuesViewComponent } from './dues-view.component';

describe('DuesViewComponent', () => {
  let component: DuesViewComponent;
  let fixture: ComponentFixture<DuesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
