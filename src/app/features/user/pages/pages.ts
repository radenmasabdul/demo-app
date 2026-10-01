import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { Search } from '../../../shared/components/search/search';
import { Select } from '../../../shared/components/select/select';
import { Table, TableAction } from '../../../shared/components/table/table';
import { CreateDialog } from '../components/create-dialog/create-dialog';
import { ApiState } from '../../../shared/components/api-state/api-state';
import { AlertService } from '../../../core/services/alert.service';
import { AlertDialogService } from '../../../core/services/alert-dialog.service';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-pages',
  imports: [Search, Select, Table, CreateDialog, ApiState, PageHeader],
  templateUrl: './pages.html',
  styleUrl: './pages.css',
})
export class UserPage {
  private readonly userService = inject(UserService);
  private readonly alertService = inject(AlertService);
  private readonly alertDialogService = inject(AlertDialogService);
  private readonly router = inject(Router);

  public readonly search = signal('');
  public readonly role = signal('');
  public readonly status = signal('');
  public readonly page = signal(0);
  public readonly pageSize = signal(10);
  public readonly totalItems = signal(0);
  public readonly isLoading = signal(true);
  public readonly isError = signal(false);

  roles = [
    { label: 'All', value: '' },
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Editor', value: 'EDITOR' },
    { label: 'Viewer', value: 'VIEWER' },
  ];

  statuses = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'NONACTIVE' },
  ];

  userColumns = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Status', key: 'status' },
    { label: 'Action', key: 'action', type: 'action' as const },
  ];

  users = toSignal(
    combineLatest([
      toObservable(this.search),
      toObservable(this.role),
      toObservable(this.status),
      toObservable(this.page),
      toObservable(this.pageSize),
      toObservable(this.userService.refreshTrigger),
    ]).pipe(
      tap(() => {
        this.isLoading.set(true);
        this.isError.set(false);
      }),
      switchMap(([search, role, status, page, pageSize]) =>
        this.userService.getUsers(search, role, status, page, pageSize),
      ),
      tap((res) => {
        const data = res.data;

        this.page.set(res.page);
        this.pageSize.set(res.size);
        this.totalItems.set(res.totalElements);
      }),
      map((res) => {
        const users = res.data;
        return users;
      }),
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError((error) => {
        this.isLoading.set(false);
        this.isError.set(true);

        this.alertService.error(error?.error?.message ?? 'Failed to load users.');

        return of([]);
      }),
    ),
    {
      initialValue: [],
    },
  );

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        console.log('User deleted:', response);

        this.alertService.success(response.message);

        this.userService.triggerRefresh();
      },

      error: (error) => {
        console.error('Failed to delete user:', error);

        this.alertService.error(error?.error?.message ?? 'Failed to delete user.');
      },
    });
  }

  onSearchChange(search: string) {
    this.search.set(search);
    this.page.set(0);
  }

  onRoleChange(role: string) {
    this.role.set(role);
    this.page.set(0);
  }

  onStatusChange(status: string) {
    this.status.set(status);
    this.page.set(0);
  }

  confirmDeleteUser(id: string) {
    this.alertDialogService.open(
      {
        title: 'Delete user?',
        description:
          'This action cannot be undone. This will permanently delete this user from the system.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
      () => {
        this.deleteUser(id);
      },
    );
  }

  onTableAction(event: TableAction) {
    if (event.action === 'view') {
      this.router.navigate(['/users', event.row.id]);
      return;
    }

    if (event.action === 'delete') {
      this.confirmDeleteUser(event.row.id);
      return;
    }
  }

  onPageChange(page: number) {
    this.page.set(page);
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.page.set(0);
  }
}
