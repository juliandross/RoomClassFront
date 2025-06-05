import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRaComponent } from './add-ra.component';

describe('AddRaComponent', () => {
  let component: AddRaComponent;
  let fixture: ComponentFixture<AddRaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
