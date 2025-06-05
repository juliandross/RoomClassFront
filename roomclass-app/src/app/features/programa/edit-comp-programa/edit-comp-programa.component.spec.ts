import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompProgramaComponent } from './edit-comp-programa.component';

describe('EditCompProgramaComponent', () => {
  let component: EditCompProgramaComponent;
  let fixture: ComponentFixture<EditCompProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCompProgramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCompProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
