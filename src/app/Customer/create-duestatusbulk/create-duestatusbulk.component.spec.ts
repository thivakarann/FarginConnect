import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDuestatusbulkComponent } from './create-duestatusbulk.component';

describe('CreateDuestatusbulkComponent', () => {
  let component: CreateDuestatusbulkComponent;
  let fixture: ComponentFixture<CreateDuestatusbulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDuestatusbulkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDuestatusbulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
