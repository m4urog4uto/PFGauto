import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/models';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/users.service';


interface DialogData {
  user: User;
}

interface Duration {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-form-user.component.html',
  styleUrls: ['./modal-form-user.component.css']
})
export class ModalFormUserComponent {

  userForm: FormGroup;

  nameCtrl: FormControl<string | null>;
  surnameCtrl: FormControl<string | null>;
  userCtrl: FormControl<string | null>;
  passwordCtrl: FormControl<string | null>;
  confirmPasswordCtrl: FormControl<string | null>;
  emailCtrl: FormControl<string | null>;

  roles: string[] = ['Administrador', 'Cliente'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ModalFormUserComponent>,
    public formBuilder: FormBuilder,
    private userService: UserService
  ) {
    const { name, surname, user, password, confirmPassword, email, role } = data.user;
    
    
    this.nameCtrl = new FormControl(name, [Validators.required]);
    this.surnameCtrl = new FormControl(surname, [Validators.required]);
    this.userCtrl = new FormControl(user, [Validators.required]);
    this.passwordCtrl = new FormControl(password, [Validators.required]);
    this.confirmPasswordCtrl = new FormControl(confirmPassword, [Validators.required]);
    this.emailCtrl = new FormControl(email, [Validators.required]);

    this.userForm = this.formBuilder.group({
      name: this.nameCtrl,
      surname: this.surnameCtrl,
      user: this.userCtrl,
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
      email: this.emailCtrl,
      role: new FormControl(role, [])
    });
  }

  onSubmit(): void {
    this.dialogRef.close(this.userForm.value);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
