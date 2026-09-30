import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { ApiResponse } from "../../../core/models/api-response.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/users`;

  public readonly refreshTrigger = signal(0);

  triggerRefresh() {
    this.refreshTrigger.update((v) => v + 1);
  }

  getUsers(
    search: string,
    role: string,
    status: string,
    page: number,
    size: number,
  ): Observable<ApiResponse<User[]>> {
    const params = new HttpParams()
      .set('search', search)
      .set('role', role)
      .set('status', status)
      .set('page', page)
      .set('size', size);

    return this.http.get<ApiResponse<User[]>>(this.apiUrl, { params });
  }

  getUserById(id: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, user);
  }

  updateUser(id: string, user: User): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<ApiResponse<User>> {
    return this.http.delete<ApiResponse<User>>(`${this.apiUrl}/${id}`);
  }
}