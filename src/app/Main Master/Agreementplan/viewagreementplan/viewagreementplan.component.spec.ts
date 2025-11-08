import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewagreementplanComponent } from './viewagreementplan.component';

describe('ViewagreementplanComponent', () => {
  let component: ViewagreementplanComponent;
  let fixture: ComponentFixture<ViewagreementplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewagreementplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewagreementplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
