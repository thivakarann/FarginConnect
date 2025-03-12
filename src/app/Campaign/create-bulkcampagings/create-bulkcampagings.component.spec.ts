import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBulkcampagingsComponent } from './create-bulkcampagings.component';

describe('CreateBulkcampagingsComponent', () => {
  let component: CreateBulkcampagingsComponent;
  let fixture: ComponentFixture<CreateBulkcampagingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBulkcampagingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBulkcampagingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
