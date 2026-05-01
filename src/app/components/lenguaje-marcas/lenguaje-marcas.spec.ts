import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenguajeMarcas } from './lenguaje-marcas';

describe('LenguajeMarcas', () => {
  let component: LenguajeMarcas;
  let fixture: ComponentFixture<LenguajeMarcas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LenguajeMarcas],
    }).compileComponents();

    fixture = TestBed.createComponent(LenguajeMarcas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
