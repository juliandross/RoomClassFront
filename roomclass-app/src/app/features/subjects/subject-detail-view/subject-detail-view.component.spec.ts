import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDetailViewComponent } from './subject-detail-view.component';

describe('SubjectDetailViewComponent', () => {
  let component: SubjectDetailViewComponent;
  let fixture: ComponentFixture<SubjectDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectDetailViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
