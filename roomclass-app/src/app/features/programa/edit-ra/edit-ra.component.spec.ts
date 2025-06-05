import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRAComponent } from './edit-ra.component';

describe('EditRAComponent', () => {
  let component: EditRAComponent;
  let fixture: ComponentFixture<EditRAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
