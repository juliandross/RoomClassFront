import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateViewDocentesComponent } from './create-view-docentes.component';

describe('CreateViewDocentesComponent', () => {
  let component: CreateViewDocentesComponent;
  let fixture: ComponentFixture<CreateViewDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateViewDocentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateViewDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
