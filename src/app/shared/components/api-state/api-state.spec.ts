import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiState } from './api-state';

describe('ApiState', () => {
  let component: ApiState;
  let fixture: ComponentFixture<ApiState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiState],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
