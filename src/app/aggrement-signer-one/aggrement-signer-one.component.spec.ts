import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementSignerOneComponent } from './aggrement-signer-one.component';

describe('AggrementSignerOneComponent', () => {
  let component: AggrementSignerOneComponent;
  let fixture: ComponentFixture<AggrementSignerOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggrementSignerOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggrementSignerOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
