import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { User } from '../../core/models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$ = new BehaviorSubject<User[]>([])
  apiBaseUsers = `${enviroment.apiBaseUrl}/users`;

  constructor(private httpClient: HttpClient) {
    this.getUsers();
  }

  getUsers(): void {
    this.httpClient.get<User[]>(this.apiBaseUsers)
      .subscribe({
        next: (User) => {
          this.user$.next(User);
        }
      });
  }

  addUser(formValue: User): void {
    this.httpClient.post<User>(
      this.apiBaseUsers,
      {
        ...formValue,
        token: `Zsdw1weqweewqeq.${Math.random() * Math.pow(10, 10)}`
      }
    )
    .pipe(take(1))
    .subscribe(
      (user) => this.user$.asObservable().pipe(take(1)).subscribe((users) => this.user$.next([ ...users, user ]))
    )
  }
  
  editUser(id: number, user: User): void {
    this.httpClient.put(this.apiBaseUsers + `/${id}`, user)
    .pipe(take(1))
    .subscribe(() => this.getUsers())
  }
  
  deleteUser(id: number): void {
    this.httpClient.delete(this.apiBaseUsers + `/${id}`)
    .pipe(take(1))
    .subscribe(() => this.getUsers())
  }

  getUserList(): Observable<User[]> {
    return this.user$.asObservable();
  }

}
