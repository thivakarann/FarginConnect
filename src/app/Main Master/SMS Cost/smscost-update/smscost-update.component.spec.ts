import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmscostUpdateComponent } from './smscost-update.component';

describe('SmscostUpdateComponent', () => {
  let component: SmscostUpdateComponent;
  let fixture: ComponentFixture<SmscostUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmscostUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmscostUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
