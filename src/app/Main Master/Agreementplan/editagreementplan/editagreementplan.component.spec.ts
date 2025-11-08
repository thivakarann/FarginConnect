import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditagreementplanComponent } from './editagreementplan.component';

describe('EditagreementplanComponent', () => {
  let component: EditagreementplanComponent;
  let fixture: ComponentFixture<EditagreementplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditagreementplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditagreementplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
