import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, map } from 'rxjs';
import { Course, Student } from 'src/app/core/models';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../courses/services/courses.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-details-students',
  templateUrl: './details-students.component.html',
  styleUrls: ['./details-students.component.css']
})
export class DetailsStudentsComponent {

  studentsList: Student[] = [];
  studentDetail: Student | undefined;
  coursesSelected: Course[] | undefined;

  role$: Observable<string | undefined>;
  destroyed$ = new Subject<void>();

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private authService: AuthService
  ) {
    this.role$ = this.authService.getAuthUser().pipe(map((user) => user?.role));
    this.studentService.getStudentDetail(parseInt(this.activatedRoute.snapshot.params['studentId']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => this.studentDetail = result);
    
    this.studentService.getStudentList().subscribe((result) => this.studentsList = result);
    
    this.coursesService.getCoursesList()
      .pipe(
        takeUntil(this.destroyed$),
        map((courses) => courses.filter((course) => this.studentDetail?.courseSelected.includes(course.courseName))
      ))
      .subscribe((result) => this.coursesSelected = result)
  }

  removeCourse(id: number): void {
    if (this.coursesSelected && this.studentDetail) {
      const courseId = this.coursesSelected.findIndex((obj) => obj.id === id);
      if (courseId > -1) {
        this.coursesSelected.splice(courseId, 1);
      };
  
      this.coursesSelected = [ ...this.coursesSelected ];
      const coursesSelectedNames = this.coursesSelected.map((csn) => csn.courseName);
      this.studentDetail.courseSelected = coursesSelectedNames;
      this.studentService.editStudent(parseInt(this.activatedRoute.snapshot.params['studentId']), this.studentDetail);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  };
}
