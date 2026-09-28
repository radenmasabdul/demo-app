import { Injectable, signal } from "@angular/core";
import { User } from "../../features/user/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();

  setCurrentUser(user: User): void {
    this._currentUser.set(user);
  }

  clearCurrentUser(): void {
    this._currentUser.set(null);
  }
}