import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransReturnDuesComponent } from './trans-return-dues.component';

describe('TransReturnDuesComponent', () => {
  let component: TransReturnDuesComponent;
  let fixture: ComponentFixture<TransReturnDuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransReturnDuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransReturnDuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
