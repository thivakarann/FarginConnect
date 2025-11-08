import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendsignersComponent } from './extendsigners.component';

describe('ExtendsignersComponent', () => {
  let component: ExtendsignersComponent;
  let fixture: ComponentFixture<ExtendsignersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendsignersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtendsignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
