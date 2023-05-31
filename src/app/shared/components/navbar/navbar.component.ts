import { Component } from '@angular/core';
import links from './nav-items';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  authUser$: Observable<User | null>;
  links = links;

  constructor(
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.getAuthUser();
  }

  logout(): void {
    this.authService.logout();
  }
}
