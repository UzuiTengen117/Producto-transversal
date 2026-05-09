import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaScript } from './java-script';

describe('JavaScript', () => {
  let component: JavaScript;
  let fixture: ComponentFixture<JavaScript>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavaScript],
    }).compileComponents();

    fixture = TestBed.createComponent(JavaScript);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
