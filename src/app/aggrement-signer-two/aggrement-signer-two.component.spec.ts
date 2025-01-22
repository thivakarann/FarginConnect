import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementSignerTwoComponent } from './aggrement-signer-two.component';

describe('AggrementSignerTwoComponent', () => {
  let component: AggrementSignerTwoComponent;
  let fixture: ComponentFixture<AggrementSignerTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggrementSignerTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggrementSignerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
