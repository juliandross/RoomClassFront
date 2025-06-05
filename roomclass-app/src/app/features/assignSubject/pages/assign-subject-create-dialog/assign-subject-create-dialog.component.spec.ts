import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSubjectCreateDialogComponent } from './assign-subject-create-dialog.component';

describe('AssignSubjectCreateDialogComponent', () => {
  let component: AssignSubjectCreateDialogComponent;
  let fixture: ComponentFixture<AssignSubjectCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignSubjectCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignSubjectCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
