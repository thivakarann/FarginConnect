import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutebulkresponseComponent } from './routebulkresponse.component';

describe('RoutebulkresponseComponent', () => {
  let component: RoutebulkresponseComponent;
  let fixture: ComponentFixture<RoutebulkresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoutebulkresponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutebulkresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
