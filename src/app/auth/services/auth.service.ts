import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { LoginForm, User } from 'src/app/core/models';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getAuthUser(): Observable<User | null> {
    return this.authUser$.asObservable();
  }

  login(formValue: LoginForm): void {
    this.httpClient.get<User[]>(
      `${enviroment.apiBaseUrl}/users`,
      {
        params: {
          ...formValue
        }
      }
    ).subscribe({
      next: (users) => {
        const userAuth = users[0];
        if (userAuth) {
          localStorage.setItem('token', userAuth.token)
          this.authUser$.next(userAuth);
          this.router.navigate(['dashboard']);
        } else {
          alert('Usuario inexistente')
        }
      },
    })
  }

  tokenVerify(): Observable<boolean> {
    const token = localStorage.getItem('token');

    return this.httpClient.get<User[]>(
      `${enviroment.apiBaseUrl}/users?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        }),
      }
    )
    .pipe(
      map((users: User[]) => {
        const userAuth = users[0];
        if (userAuth) {
          localStorage.setItem('token', userAuth.token)
          this.authUser$.next(userAuth);
        }
        return !!userAuth;
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    )
  }

  adminVerify(): Observable<boolean> {
    const token = localStorage.getItem('token');

    return this.httpClient.get<User[]>(
      `${enviroment.apiBaseUrl}/users?token=${token}`
    )
    .pipe(
      map((users: User[]) => {
        const userAuth = users[0];
        return userAuth.role === 'Administrador'
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }
}
