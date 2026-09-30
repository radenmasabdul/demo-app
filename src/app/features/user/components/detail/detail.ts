import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  readonly user = signal<User | null>(null);
  readonly isLoading = signal(true);
  readonly isError = signal(false);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.isLoading.set(false);
      this.isError.set(true);
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
      },
    });
  }
}
