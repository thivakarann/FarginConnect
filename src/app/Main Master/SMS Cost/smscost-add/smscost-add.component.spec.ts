import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMScostAddComponent } from './smscost-add.component';

describe('SMScostAddComponent', () => {
  let component: SMScostAddComponent;
  let fixture: ComponentFixture<SMScostAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SMScostAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SMScostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
