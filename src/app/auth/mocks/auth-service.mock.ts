import { BehaviorSubject } from 'rxjs';
import { LoginForm, User } from 'src/app/core/models';

export const USER_MOCK = {
    id: 1,
    name: 'Mauro',
    surname: 'Gauto',
    user: 'mauro123',
    password: '123456',
    confirmPassword: '123456',
    role: 'Administrador',
    email: 'mauro.gauto99@gmail.com',
    token: 'jalsjdlksajdlksajdlkas.213213123213'
}

export class AuthServiceMock {

    private authUser$ = new BehaviorSubject<User | null>(null);

    login(formValue: LoginForm): void {
        this.authUser$.next(USER_MOCK);
    }
}