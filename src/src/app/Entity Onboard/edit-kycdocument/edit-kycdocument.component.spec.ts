import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKycdocumentComponent } from './edit-kycdocument.component';

describe('EditKycdocumentComponent', () => {
  let component: EditKycdocumentComponent;
  let fixture: ComponentFixture<EditKycdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditKycdocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditKycdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
