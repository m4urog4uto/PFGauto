import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from 'src/app/core/models';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormCourseComponent } from '../../components/ModalFormCourse/modal-form-course.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { CoursesActions } from '../../store/courses.actions';
import { selectCoursesState } from '../../store/courses.selectors';
import { initialState } from '../../store/courses.reducer';

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
    private authService: AuthService,
    private store: Store
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
      if (result) {
        this.store.dispatch(CoursesActions.createCourse({
          data: result
        }))
      }
    });
  }

  removeCourse(id: number): void {
    this.store.dispatch(CoursesActions.deleteCourse({ id }))
  }

  editCourse(id: number): void {
    debugger;
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
          this.store.dispatch(CoursesActions.editCourse({ id, data: result }))
        }
      });

    }
  }
}
