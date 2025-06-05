import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRaComponent } from './edit-ra.component';

describe('EditRaComponent', () => {
  let component: EditRaComponent;
  let fixture: ComponentFixture<EditRaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
