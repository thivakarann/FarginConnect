import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusTicketeCreateComponent } from './cus-tickete-create.component';

describe('CusTicketeCreateComponent', () => {
  let component: CusTicketeCreateComponent;
  let fixture: ComponentFixture<CusTicketeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CusTicketeCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CusTicketeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
