import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5261/api/auth';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private authCheckedSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedInSubject.asObservable();
  authChecked$ = this.authCheckedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuth();
  }

  register(request: RegisterRequest): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/register`,
      request
    );
  }

  login(request: LoginRequest): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/login`,
      request,
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.loggedInSubject.next(true);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.loggedInSubject.next(false);
      })
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/me`,
      { withCredentials: true }
    );
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  checkAuth(): void {
    this.getUser().subscribe({
      next: () => {
        this.loggedInSubject.next(true);
        this.authCheckedSubject.next(true);
      },
      error: () => {
        this.loggedInSubject.next(false);
        this.authCheckedSubject.next(true);
      }
    });
  }
}