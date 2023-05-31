import { Injectable } from '@angular/core';
import { Student } from '../../core/models';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { CoursesService } from '../../courses/services/courses.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private courses$: Observable<string[]>;

  private students$ = new BehaviorSubject<Student[]>([]);

  apiBaseStudent = `${enviroment.apiBaseUrl}/students`;

  constructor(
    private coursesService: CoursesService,
    private httpClient: HttpClient
  ) {
    this.courses$ = this.coursesService.getCoursesList().pipe(
      map((courses) => courses.map((course) => course.courseName))
    );
    this.httpClient.get<Student[]>(this.apiBaseStudent)
      .subscribe({
        next: (students) => {
          this.students$.next(students);
        }
      })
  }

  addStudent(studentValue: Student): void {
    this.httpClient.post<Student>(
      this.apiBaseStudent, studentValue
    )
    .pipe(take(1))
    .subscribe(
      (student) => this.students$.asObservable().pipe(take(1)).subscribe((students) => this.students$.next([ ...students, student ]))
    )
  }

  editStudent(id: number, student: Student): void {
    this.httpClient.put(this.apiBaseStudent + `/${id}`, student)
    .pipe(take(1))
    .subscribe(
      () => {
        this.httpClient.get<Student[]>(this.apiBaseStudent)
        .subscribe({
          next: (students) => {
            this.students$.next(students);
          }
        })
      }
    )
  }

  deleteStudent(id: number): void {
    this.httpClient.delete(this.apiBaseStudent + `/${id}`)
    .pipe(take(1))
    .subscribe(
      () => {
        this.httpClient.get<Student[]>(this.apiBaseStudent)
        .subscribe({
          next: (students) => {
            this.students$.next(students);
          }
        })
      }
    )
  }

  getListOfCourses(): Observable<string[]> {
    return this.courses$;
  }

  getStudentList(): Observable<Student[]> {
    return this.students$.asObservable();
  }

  getStudentDetail(id: number): Observable<Student | undefined> {
    return this.students$.asObservable()
      .pipe(
        map((students: Student[]) => students.find((student) => student.id === id))
      )
  }
}
