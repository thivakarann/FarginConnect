import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffstatusComponent } from './offstatus.component';

describe('OffstatusComponent', () => {
  let component: OffstatusComponent;
  let fixture: ComponentFixture<OffstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
