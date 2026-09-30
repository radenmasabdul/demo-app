import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog, InputConfig } from '../../../../shared/components/dialog/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-create-dialog',
  imports: [ReactiveFormsModule, Dialog],
  templateUrl: './create-dialog.html',
  styleUrl: './create-dialog.css',
})
export class CreateDialog {
  private readonly fb = new FormBuilder();
  private readonly userService = inject(UserService);
  private readonly alertService = inject(AlertService);

  userForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    role: ['', Validators.required],
    status: ['', Validators.required],
    phoneNumber: [''],
    profileImageUrl: [''],
  });

  userInputs: InputConfig[] = [
    {
      key: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter full name',
    },
    {
      key: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter username',
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter phone number',
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      placeholder: 'Select role',
      options: [
        { label: 'ADMIN', value: 'ADMIN' },
        { label: 'EDITOR', value: 'EDITOR' },
        { label: 'VIEWER', value: 'VIEWER' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status',
      options: [
        { label: 'ACTIVE', value: 'ACTIVE' },
        { label: 'NONACTIVE', value: 'NONACTIVE' },
      ],
    },
    {
      key: 'profileImageUrl',
      label: 'Profile Image URL',
      type: 'text',
      placeholder: 'Enter profile image URL',
    },
  ];

  onSave() {
    const newUserData = this.userForm.value as User;

    this.userService.createUser(newUserData).subscribe({
      next: (response) => {
        console.log('User berhasil dibuat:', response);
        this.userService.triggerRefresh();
        this.userForm.reset();
        this.alertService.success(response.message);
      },
      error: (err) => {
        console.error('Gagal membuat user:', err);
        this.alertService.error(err?.error?.message ?? 'Failed to create user.');
      },
    });
  }
}
