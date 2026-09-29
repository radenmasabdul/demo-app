import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppButtonGeneral } from './button';

describe('AppButtonGeneral', () => {
  let component: AppButtonGeneral;
  let fixture: ComponentFixture<AppButtonGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppButtonGeneral],
    }).compileComponents();

    fixture = TestBed.createComponent(AppButtonGeneral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
