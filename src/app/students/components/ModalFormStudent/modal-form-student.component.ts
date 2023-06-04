import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/core/models';
import { StudentService } from '../../services/student.service';
import { Observable } from 'rxjs';


interface DialogData {
  alumno: Student;
}

interface Courses {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-form-student.component.html',
  styleUrls: ['./modal-form-student.component.css']
})
export class ModalFormStudentComponent {

  studentForm: FormGroup;

  nameCtrl: FormControl<string | null>;
  surnameCtrl: FormControl<string | null>;
  dniCtrl: FormControl<string | null>;
  emailCtrl: FormControl<string | null>;
  phoneCtrl: FormControl<string | null>;
  courseSelectedCtrl: FormControl<string[] | null>;

  coursesList$: Observable<string[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ModalFormStudentComponent>,
    public formBuilder: FormBuilder,
    private studentService: StudentService
  ) {
    this.coursesList$ = this.studentService.getListOfCourses(); 

    const { id, dni, name, surname, email, phone, courseSelected } = data.alumno;
    
    this.nameCtrl = new FormControl(name, [ Validators.required ]);
    this.surnameCtrl = new FormControl(surname, [ Validators.required ]);
    this.dniCtrl = new FormControl(dni, [ Validators.required ]);
    this.emailCtrl = new FormControl(email, [ Validators.required, Validators.email ]);
    this.phoneCtrl = new FormControl(phone, [ Validators.required ]);
    this.courseSelectedCtrl = new FormControl(courseSelected);

    this.studentForm = this.formBuilder.group({
      id: new FormControl(id, []), 
      dni: this.dniCtrl,
      name: this.nameCtrl,
      surname: this.surnameCtrl,
      email: this.emailCtrl,
      phone: this.phoneCtrl,
      courseSelected: this.courseSelectedCtrl,
    });
  }

  onSubmit(): void {
    this.dialogRef.close(this.studentForm.value);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
