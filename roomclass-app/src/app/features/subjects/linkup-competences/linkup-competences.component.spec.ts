import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkupCompetencesComponent } from './linkup-competences.component';

describe('LinkupCompetencesComponent', () => {
  let component: LinkupCompetencesComponent;
  let fixture: ComponentFixture<LinkupCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkupCompetencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkupCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
