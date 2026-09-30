import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../services/user.service';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { AppButtonGeneral } from '../../../shared/components/button/button';
import { Search } from '../../../shared/components/search/search';
import { Select } from '../../../shared/components/select/select';
import { Table, TableAction } from '../../../shared/components/table/table';

@Component({
  selector: 'app-pages',
  imports: [AppButtonGeneral, Search, Select, Table],
  templateUrl: './pages.html',
  styleUrl: './pages.css',
})
export class UserPage {
  private readonly userService = inject(UserService);

  public readonly search = signal('');
  public readonly role = signal('');
  public readonly status = signal('');
  public readonly page = signal(0);
  public readonly pageSize = signal(10);
  public readonly totalItems = signal(0);

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
    ]).pipe(
      switchMap(([search, role, status, page, pageSize]) =>
        this.userService.getUsers(search, role, status, page, pageSize),
      ),
      tap((res) => {
        const data = res.data;

        console.log('API response:', res);
        console.log('API data:', data);

        this.page.set(res.page);
        this.pageSize.set(res.size);
        this.totalItems.set(res.totalElements);
      }),
      map((res) => {
        const users = res.data;

        console.log('Mapped users:', users);

        return users;
      }),
    ),
    {
      initialValue: [],
    },
  );

  onSearchChange(search: string) {
    console.log('Search:', search);

    this.search.set(search);
    this.page.set(0);
  }

  onRoleChange(role: string) {
    console.log('Role:', role);

    this.role.set(role);
    this.page.set(0);
  }

  onStatusChange(status: string) {
    console.log('Status:', status);

    this.status.set(status);
    this.page.set(0);
  }

  onTableAction(event: TableAction) {
    console.log('a', event.action);
    console.log('b', event.row);
  }

  onPageChange(page: number) {
    console.log('Page:', page);

    this.page.set(page);
  }

  onPageSizeChange(size: number) {
    console.log('Page size:', size);

    this.pageSize.set(size);
    this.page.set(0);
  }
}
