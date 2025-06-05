import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompetenceComponent } from './edit-competence.component';

describe('EditCompetenceComponent', () => {
  let component: EditCompetenceComponent;
  let fixture: ComponentFixture<EditCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCompetenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
