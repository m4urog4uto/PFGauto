import { Component } from '@angular/core';
import { User } from 'src/app/core/models';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormUserComponent } from '../../components/ModalFormUser/modal-form-user.component';
import { UserService } from '../../services/users.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.css']
})
export class DashboardUserComponent {
  users: User[] = [];

  constructor(
    private dialogService: MatDialog,
    private userService: UserService
  ) {
    this.userService.getUserList().pipe(
      map((users) => users.filter((user) => user.role !== 'Administrador'))
    ).subscribe((user) => this.users = user);
  }

  addUser(): void {
    const dialogo = this.dialogService.open(ModalFormUserComponent, {
      data: {
        user: {
          name: '',
          surname: '',
          user: '',
          password: '',
          confirmPassword: '',
          email: '',
          role: 'Cliente'
        }
      }
    });

    dialogo.afterClosed().subscribe(result => {
      if (result.name) {
        this.userService.addUser(result);
        this.users = [ ...this.users, result ];
      }
    });
  }

  removeUser(id: number): void {
    console.log(id);
    const userId = this.users.findIndex((obj) => obj.id === id);
    if (userId > -1) {
      this.users.splice(userId, 1);
    };

    this.users = [ ...this.users ];
    this.userService.deleteUser(id);
  }

  editUser(id: number): void {
    const userId = this.users.find((obj) => obj.id === id);
    if (userId) {
      const { id, name, surname, user, password, confirmPassword, email, role } = userId;
      const dialogo = this.dialogService.open(ModalFormUserComponent, {
        data: {
          user: {
            id,
            name,
            surname,
            user,
            password,
            confirmPassword,
            email,
            role
          }
        }
      });

      dialogo.afterClosed().subscribe((result: User) => {
        if (result) {
          this.userService.editUser(id, result);
        }
      });

    }
  }
}
