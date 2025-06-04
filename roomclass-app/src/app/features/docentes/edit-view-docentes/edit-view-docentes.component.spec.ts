import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViewDocentesComponent } from './edit-view-docentes.component';

describe('EditViewDocentesComponent', () => {
  let component: EditViewDocentesComponent;
  let fixture: ComponentFixture<EditViewDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditViewDocentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditViewDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
