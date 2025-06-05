import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompComponent } from './edit-comp.component';

describe('EditCompComponent', () => {
  let component: EditCompComponent;
  let fixture: ComponentFixture<EditCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
