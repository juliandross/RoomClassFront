import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompetenceComponent } from './add-competence.component';

describe('AddCompetenceComponent', () => {
  let component: AddCompetenceComponent;
  let fixture: ComponentFixture<AddCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCompetenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
