import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaComponent } from './ra.component';

describe('RaComponent', () => {
  let component: RaComponent;
  let fixture: ComponentFixture<RaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
