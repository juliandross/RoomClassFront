import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewDocentesComponent } from './detail-view-docentes.component';

describe('DetailViewDocentesComponent', () => {
  let component: DetailViewDocentesComponent;
  let fixture: ComponentFixture<DetailViewDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailViewDocentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailViewDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
