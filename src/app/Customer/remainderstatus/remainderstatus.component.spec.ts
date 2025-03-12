import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainderstatusComponent } from './remainderstatus.component';

describe('RemainderstatusComponent', () => {
  let component: RemainderstatusComponent;
  let fixture: ComponentFixture<RemainderstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemainderstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemainderstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
