import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericViewDetailsComponent } from './generic-view-details.component';

describe('GenericViewDetailsComponent', () => {
  let component: GenericViewDetailsComponent;
  let fixture: ComponentFixture<GenericViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericViewDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
