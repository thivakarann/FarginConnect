import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDuesComponent } from './return-dues.component';

describe('ReturnDuesComponent', () => {
  let component: ReturnDuesComponent;
  let fixture: ComponentFixture<ReturnDuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnDuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnDuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
