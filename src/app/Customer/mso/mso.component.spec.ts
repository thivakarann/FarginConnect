import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsoComponent } from './mso.component';

describe('MsoComponent', () => {
  let component: MsoComponent;
  let fixture: ComponentFixture<MsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
