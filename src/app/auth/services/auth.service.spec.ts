import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { LoginForm } from '../../core/models';
import { enviroment } from '../../../environments/environments';
import { USER_MOCK } from '../mocks/auth-service.mock';
import { Router } from '@angular/router';
import { skip } from 'rxjs';

describe('Auth Services Test', () => {
    let service: AuthService;
    let httpController: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        }).compileComponents();

        service = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
    })

    it('Login Service Should work', (done) => {
        const mockLogin: LoginForm = {
            user: 'mauro123',
            password: '123456'
        }

        service.login(mockLogin);

        service.getAuthUser()
            .pipe(
                skip(1)
            )
            .subscribe((user) => {
                expect(user).toBeTruthy();
                done();
            });

        spyOn(TestBed.inject(Router), 'navigate');

        httpController.expectOne({
            url: `${enviroment.apiBaseUrl}/users?user=${mockLogin.user}&password=${mockLogin.password}`
        }).flush([
            USER_MOCK
        ])
    })

    it('Should function logout emit an authUser as null, remove token and redirect', () => {
        const mockLogin: LoginForm = {
            user: 'mauro123',
            password: '123456'
        }

        service.login(mockLogin);

        spyOn(TestBed.inject(Router), 'navigate');

        httpController.expectOne({
            url: `${enviroment.apiBaseUrl}/users?user=${mockLogin.user}&password=${mockLogin.password}`
        }).flush([
            USER_MOCK
        ])

        service.logout();

        const tokenLs = localStorage.getItem('token');
        expect(tokenLs).toBeNull();
    })
})