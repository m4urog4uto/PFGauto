import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/core/models';
import { ModalFormStudentComponent } from '../../components/ModalFormStudent/modal-form-student.component';
import { Observable, Subject, takeUntil, map } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-students',
  templateUrl: './dashboard-students.component.html',
  styleUrls: ['./dashboard-students.component.css']
})
export class DashboardStudentsComponent {
  students: Student[] = [];
  destroyed$ = new Subject<void>();
  role$: Observable<string | undefined>;

  constructor(
    private dialogService: MatDialog,
    private studentService: StudentService,
    private authService: AuthService
  ) {
    this.role$ = this.authService.getAuthUser().pipe(map((user) => user?.role));
    studentService.getStudentList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((students: Student[]) => this.students = students)
  }

  addStudentForm(): void {
    const dialogo = this.dialogService.open(ModalFormStudentComponent, {
      data: {
        alumno: {
          name: '',
          surname: '',
          dni: '',
          email: '',
          phone: '',
          courseSelected: ''
        }
      }
    });

    dialogo.afterClosed().subscribe(result => {
      if (result) {
        this.students = [ ...this.students, result ];
        this.studentService.addStudent(result);
      }
    });
  }

  removeStudent(id: number): void {
    const studentId = this.students.findIndex((obj) => obj.id === id);
    if (studentId > -1) {
      this.students.splice(studentId, 1);
    };

    this.students = [ ...this.students ];
    this.studentService.deleteStudent(id);
  }

  editStudent(id: number): void {
    const studentId = this.students.find((obj) => obj.id === id);
    if (studentId) {
      const { id, name, surname, dni, email, phone, courseSelected } = studentId;
      const dialogo = this.dialogService.open(ModalFormStudentComponent, {
        data: {
          alumno: {
            id,
            name,
            surname,
            dni,
            email,
            phone,
            courseSelected
          }
        }
      });

      dialogo.afterClosed().subscribe((result: Student) => {
        if (result) {
          const newStudentsList = this.students.map(obj => {
            if (obj.id === result.id) {
              return { ...obj, ...result }
            }
            return obj;
          })
          this.students = [ ...newStudentsList ];
          this.studentService.editStudent(id, result);
        }
      });

    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  };
}
