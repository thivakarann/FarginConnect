import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsEditlogComponent } from './whats-editlog.component';

describe('WhatsEditlogComponent', () => {
  let component: WhatsEditlogComponent;
  let fixture: ComponentFixture<WhatsEditlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatsEditlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatsEditlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
