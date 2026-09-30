import { Routes } from '@angular/router';
import { UserPage } from './features/user/pages/pages';
import { Detail } from './features/user/components/detail/detail';

export const routes: Routes = [
  {
    path: '',
    component: UserPage,
  },
  {
    path: 'users/:id',
    component: Detail,
  },
];
