import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycdocumentViewComponent } from './kycdocument-view.component';

describe('KycdocumentViewComponent', () => {
  let component: KycdocumentViewComponent;
  let fixture: ComponentFixture<KycdocumentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycdocumentViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycdocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
