import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpoViewComponent } from './dpo-view.component';

describe('DpoViewComponent', () => {
  let component: DpoViewComponent;
  let fixture: ComponentFixture<DpoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DpoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DpoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
