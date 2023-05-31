import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from 'src/app/core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userCtrl = new FormControl('', [Validators.required]);
  passwordCtrl = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    user: this.userCtrl,
    password: this.passwordCtrl
  })

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.loginForm.value as LoginForm)
    }
  }
}
