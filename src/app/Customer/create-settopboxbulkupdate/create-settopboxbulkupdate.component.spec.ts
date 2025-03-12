import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSettopboxbulkupdateComponent } from './create-settopboxbulkupdate.component';

describe('CreateSettopboxbulkupdateComponent', () => {
  let component: CreateSettopboxbulkupdateComponent;
  let fixture: ComponentFixture<CreateSettopboxbulkupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSettopboxbulkupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSettopboxbulkupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
