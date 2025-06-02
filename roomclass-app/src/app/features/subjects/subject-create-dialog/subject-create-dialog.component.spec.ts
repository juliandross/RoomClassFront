import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCreateDialogComponent } from './subject-create-dialog.component';

describe('SubjectCreateDialogComponent', () => {
  let component: SubjectCreateDialogComponent;
  let fixture: ComponentFixture<SubjectCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
