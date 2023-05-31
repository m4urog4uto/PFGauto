import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from 'src/app/core/models';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormCourseComponent } from '../../components/ModalFormCourse/modal-form-course.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-dashboard-courses',
  templateUrl: './dashboard-courses.component.html',
  styleUrls: ['./dashboard-courses.component.css']
})
export class DashboardCoursesComponent {
  courses: Course[] = [];
  role$: Observable<string | undefined>;

  constructor(
    private dialogService: MatDialog,
    private coursesService: CoursesService,
    private authService: AuthService
  ) {
    this.role$ = this.authService.getAuthUser().pipe(map((user) => user?.role));
    this.coursesService.getCoursesList().subscribe((courses) => this.courses = courses);
  }

  addCourse(): void {
    const dialogo = this.dialogService.open(ModalFormCourseComponent, {
      data: {
        course: {
          courseName: '',
          description: '',
          duration: ''
        }
      }
    });

    dialogo.afterClosed().subscribe(result => {
      if (result.courseName) {
        this.courses = [ ...this.courses, result ];
        this.coursesService.addCourse(result);
      }
    });
  }

  removeCourse(id: number): void {
    const studentId = this.courses.findIndex((obj) => obj.id === id);
    if (studentId > -1) {
      this.courses.splice(studentId, 1);
    };

    this.courses = [ ...this.courses ];
    this.coursesService.deleteCourse(id);
  }

  editCourse(id: number): void {
    const studentId = this.courses.find((obj) => obj.id === id);
    if (studentId) {
      const { id, courseName, description, duration } = studentId;
      const dialogo = this.dialogService.open(ModalFormCourseComponent, {
        data: {
          course: {
            id,
            courseName,
            description,
            duration
          }
        }
      });

      dialogo.afterClosed().subscribe((result: Course) => {
        if (result) {
          const newAlumnosList = this.courses.map(obj => {
            if (obj.id === result.id) {
              return { ...obj, ...result }
            }
            return obj;
          })
          this.courses = [ ...newAlumnosList ];
          this.coursesService.editCourse(id, result);
        }
      });

    }
  }
}
