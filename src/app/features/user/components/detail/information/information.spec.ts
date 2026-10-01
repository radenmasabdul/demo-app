import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Information } from './information';

describe('Information', () => {
  let component: Information;
  let fixture: ComponentFixture<Information>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Information, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Information);
    component = fixture.componentInstance;

    const mockUser = {
      name: 'Bro Developer',
      username: 'brodev',
      email: 'bro@example.com',
      phoneNumber: '08123456789',
      role: 'Admin',
      status: 'Active',
      profileImageUrl: 'https://example.com',
    };

    const mockForm = new FormGroup({
      name: new FormControl(mockUser.name),
      username: new FormControl(mockUser.username),
      email: new FormControl(mockUser.email),
      phoneNumber: new FormControl(mockUser.phoneNumber),
      role: new FormControl(mockUser.role),
      status: new FormControl(mockUser.status),
    });

    fixture.componentRef.setInput('user', mockUser);
    fixture.componentRef.setInput('editForm', mockForm);

    await fixture.whenStable();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
