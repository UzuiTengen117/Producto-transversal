import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSS3 } from './css3';

describe('CSS3', () => {
  let component: CSS3;
  let fixture: ComponentFixture<CSS3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CSS3],
    }).compileComponents();

    fixture = TestBed.createComponent(CSS3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
