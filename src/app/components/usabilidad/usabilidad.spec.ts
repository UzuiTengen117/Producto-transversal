import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usabilidad } from './usabilidad';

describe('Usabilidad', () => {
  let component: Usabilidad;
  let fixture: ComponentFixture<Usabilidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Usabilidad],
    }).compileComponents();

    fixture = TestBed.createComponent(Usabilidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
