import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRAComponent } from './add-ra.component';

describe('AddRAComponent', () => {
  let component: AddRAComponent;
  let fixture: ComponentFixture<AddRAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
