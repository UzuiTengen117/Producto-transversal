import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquitecturaYServicios } from './arquitectura-y-servicios';

describe('ArquitecturaYServicios', () => {
  let component: ArquitecturaYServicios;
  let fixture: ComponentFixture<ArquitecturaYServicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArquitecturaYServicios],
    }).compileComponents();

    fixture = TestBed.createComponent(ArquitecturaYServicios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
