import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompProgramaComponent } from './create-comp-programa.component';

describe('CreateCompProgramaComponent', () => {
  let component: CreateCompProgramaComponent;
  let fixture: ComponentFixture<CreateCompProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCompProgramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCompProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
