import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUser } from '@ng-icons/lucide';

import { User } from '../../../models/user.model';

type UserField = {
  label: string;
  key: keyof User;
};

@Component({
  selector: 'app-information',
  imports: [ReactiveFormsModule, NgIcon],
  providers: [provideIcons({ lucideUser })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './information.html',
  styleUrl: './information.css',
})
export class Information {
  user = input.required<User>();
  isEditing = input(false);
  editForm = input.required<FormGroup>();

  fields: UserField[] = [
    { label: 'Name', key: 'name' },
    { label: 'Username', key: 'username' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Role', key: 'role' },
    { label: 'Status', key: 'status' },
  ];
}
