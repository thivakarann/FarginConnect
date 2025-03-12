import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincustomertransactionComponent } from './admincustomertransaction.component';

describe('AdmincustomertransactionComponent', () => {
  let component: AdmincustomertransactionComponent;
  let fixture: ComponentFixture<AdmincustomertransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmincustomertransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmincustomertransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
