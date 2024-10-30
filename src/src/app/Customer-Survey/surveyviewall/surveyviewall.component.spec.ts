import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyviewallComponent } from './surveyviewall.component';

describe('SurveyviewallComponent', () => {
  let component: SurveyviewallComponent;
  let fixture: ComponentFixture<SurveyviewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyviewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyviewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
