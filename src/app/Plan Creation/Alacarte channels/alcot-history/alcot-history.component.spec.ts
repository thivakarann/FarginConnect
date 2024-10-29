import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcotHistoryComponent } from './alcot-history.component';

describe('AlcotHistoryComponent', () => {
  let component: AlcotHistoryComponent;
  let fixture: ComponentFixture<AlcotHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlcotHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlcotHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
