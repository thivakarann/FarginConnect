import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsignersComponent } from './editsigners.component';

describe('EditsignersComponent', () => {
  let component: EditsignersComponent;
  let fixture: ComponentFixture<EditsignersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditsignersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditsignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
