import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatewhatsappServiceComponent } from './updatewhatsapp-service.component';

describe('UpdatewhatsappServiceComponent', () => {
  let component: UpdatewhatsappServiceComponent;
  let fixture: ComponentFixture<UpdatewhatsappServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatewhatsappServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatewhatsappServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
