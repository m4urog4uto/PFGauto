import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../shared/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from "../../services/auth.service";
import { AuthServiceMock } from "../../mocks/auth-service.mock";

describe('Login test component', () => {
    let component: LoginComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                HttpClientModule,
                MaterialModule,
                ReactiveFormsModule,
                RouterTestingModule,
                SharedModule,
                PipesModule,
                BrowserAnimationsModule
            ],
            providers: [
                {
                    provide: AuthService,
                    useClass: AuthServiceMock
                }
            ]
        }).compileComponents();

        const fixture = TestBed.createComponent(LoginComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should get a input error if user FormControl is empty', () => {
        component.loginForm.setValue({ user: null, password: null });

        expect(component.userCtrl.invalid).toBeTrue()
    })

    it('Should get a input error if password FormControl is empty', () => {
        component.loginForm.setValue({ user: null, password: null });

        expect(component.passwordCtrl.invalid).toBeTrue()
    })

    it('Should mark all input controls as touched if login form is invalid', () => {
        component.loginForm.setValue({ user: null, password: null });
        const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');

        component.onSubmit();

        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
    })

    it('Should call login auth service if login form is valid', () => {
        component.loginForm.setValue({ user: 'admin', password: 'admin' });

        const spyOnAuthServiceLogin = spyOn(TestBed.inject(AuthService), 'login');

        component.onSubmit();

        expect(component.loginForm.valid).toBeTrue();
        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
    })
});