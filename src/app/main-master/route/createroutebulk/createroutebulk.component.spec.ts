import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateroutebulkComponent } from './createroutebulk.component';

describe('CreateroutebulkComponent', () => {
  let component: CreateroutebulkComponent;
  let fixture: ComponentFixture<CreateroutebulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateroutebulkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateroutebulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
