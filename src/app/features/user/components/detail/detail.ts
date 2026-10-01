import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { Navigation } from '../../../../shared/components/navigation/navigation';
import { Information } from './information/information';
import { ApiState } from '../../../../shared/components/api-state/api-state';

@Component({
  selector: 'app-user-detail',
  imports: [ReactiveFormsModule, PageHeader, Navigation, Information, ApiState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);

  readonly user = signal<User | null>(null);
  readonly isLoading = signal(true);
  readonly isError = signal(false);
  readonly errorMessage = signal('');
  readonly isEditing = signal(false);
  readonly isSaving = signal(false);

  readonly editForm = this.fb.group({
    role: ['', Validators.required],
    status: ['', Validators.required],
    phoneNumber: [''],
    profileImageUrl: [''],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.isLoading.set(false);
      this.isError.set(true);
      this.errorMessage.set('User ID is missing.');
      return;
    }

    this.userService.getUserById(id).subscribe({
      next: (response) => {
        this.user.set(response.data);
        this.isLoading.set(false);
      },

      error: (error) => {
        console.error('Failed to load user:', error);

        this.isLoading.set(false);
        this.isError.set(true);
        this.errorMessage.set(error?.error?.message ?? 'Failed to load user.');
      },
    });
  }

  edit() {
    const user = this.user();

    if (!user) {
      return;
    }

    this.editForm.patchValue({
      role: user.role,
      status: user.status,
      phoneNumber: user.phoneNumber,
      profileImageUrl: user.profileImageUrl,
    });

    this.isEditing.set(true);
  }

  cancelEdit() {
    this.editForm.reset();
    this.isEditing.set(false);
  }

  save() {
    const user = this.user();

    if (!user || this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const id = user.id;

    const updatedUser: User = {
      ...user,
      role: this.editForm.value.role ?? user.role,
      status: this.editForm.value.status ?? user.status,
      phoneNumber: this.editForm.value.phoneNumber ?? '',
      profileImageUrl: this.editForm.value.profileImageUrl ?? '',
    };

    this.isSaving.set(true);

    this.userService.updateUser(id, updatedUser).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.user.set(response.data);
          this.isEditing.set(false);
          this.isSaving.set(false);
        }, 500);
      },

      error: (error) => {
        console.error('Failed to update user:', error);

        this.isSaving.set(false);
        this.errorMessage.set(error?.error?.message ?? 'Failed to update user.');
      },
    });
  }
}
