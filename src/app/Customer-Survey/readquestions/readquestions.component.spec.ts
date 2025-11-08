import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadquestionsComponent } from './readquestions.component';

describe('ReadquestionsComponent', () => {
  let component: ReadquestionsComponent;
  let fixture: ComponentFixture<ReadquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadquestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
