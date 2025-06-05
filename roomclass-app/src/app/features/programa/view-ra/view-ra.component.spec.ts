import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRAComponent } from './view-ra.component';

describe('ViewRAComponent', () => {
  let component: ViewRAComponent;
  let fixture: ComponentFixture<ViewRAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
