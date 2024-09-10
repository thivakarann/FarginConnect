import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycCommentsComponent } from './kyc-comments.component';

describe('KycCommentsComponent', () => {
  let component: KycCommentsComponent;
  let fixture: ComponentFixture<KycCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
