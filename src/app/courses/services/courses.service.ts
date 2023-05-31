import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Course } from '../../core/models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses$ = new BehaviorSubject<Course[]>([])

  apiBaseCourses = `${enviroment.apiBaseUrl}/courses`;

  constructor(private httpClient: HttpClient) {
    this.getCourses();
  }

  getCourses(): void {
    this.httpClient.get<Course[]>(this.apiBaseCourses)
      .subscribe({
        next: (courses) => {
          this.courses$.next(courses);
        }
      })
  }

  addCourse(courseValue: Course): void {
    this.httpClient.post<Course>(
      this.apiBaseCourses, courseValue
    )
    .pipe(take(1))
    .subscribe(
      (course) => this.courses$.asObservable().pipe(take(1)).subscribe((courses) => this.courses$.next([ ...courses, course ]))
    )
  }

  editCourse(id: number, course: Course): void {
    this.httpClient.put(this.apiBaseCourses + `/${id}`, course)
    .pipe(take(1))
    .subscribe(() => this.getCourses())
  }

  deleteCourse(id: number): void {
    this.httpClient.delete(this.apiBaseCourses + `/${id}`)
    .pipe(take(1))
    .subscribe(() => this.getCourses())
  }
  
  getCoursesList(): Observable<Course[]> {
    return this.courses$.asObservable();
  }

  getCourseDetail(id: number): Observable<Course> {
    return this.httpClient.get<Course>(this.apiBaseCourses + `/${id}`);
  }

}
