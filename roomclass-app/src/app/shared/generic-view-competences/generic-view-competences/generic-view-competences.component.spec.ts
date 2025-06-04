import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericViewCompetencesComponent } from './generic-view-competences.component';

describe('GenericViewCompetencesComponent', () => {
  let component: GenericViewCompetencesComponent;
  let fixture: ComponentFixture<GenericViewCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericViewCompetencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericViewCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
