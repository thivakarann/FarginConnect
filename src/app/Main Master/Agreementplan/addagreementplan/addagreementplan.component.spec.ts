import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddagreementplanComponent } from './addagreementplan.component';

describe('AddagreementplanComponent', () => {
  let component: AddagreementplanComponent;
  let fixture: ComponentFixture<AddagreementplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddagreementplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddagreementplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
