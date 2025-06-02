import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSubjectViewComponent } from './assign-subject-view.component';

describe('AssignSubjectViewComponent', () => {
  let component: AssignSubjectViewComponent;
  let fixture: ComponentFixture<AssignSubjectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignSubjectViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignSubjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
