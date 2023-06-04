import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, mergeMap, of, take } from 'rxjs';
import { Course } from '../../core/models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';
import { Store } from '@ngrx/store';
import { CoursesActions } from '../store/courses.actions';
import { selectCoursesState } from '../store/courses.selectors';
import { State, initialState } from '../store/courses.reducer';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  state: State = initialState;
  private courses$ = new BehaviorSubject<Course[]>([])

  apiBaseCourses = `${enviroment.apiBaseUrl}/courses`;

  constructor(private httpClient: HttpClient, private store: Store) {
    this.getCourses();
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.apiBaseCourses);
  }

  getCoursesList(): Observable<Course[]> {
    this.store.dispatch(CoursesActions.loadCourses())
    return this.store.select(selectCoursesState).pipe(mergeMap((data) => of(data.courses)))
  }

  getCourseDetail(id: number): Observable<Course> {
    return this.httpClient.get<Course>(this.apiBaseCourses + `/${id}`);
  }

  addCourse(courseValue: Course): Observable<Course> {
    return this.httpClient.post<Course>(this.apiBaseCourses, courseValue)
  }

  editCourse(id: number, course: Course): Observable<Course> {
    return this.httpClient.put<Course>(this.apiBaseCourses + `/${id}`, course);
  }

  deleteCourse(id: number): Observable<Course> {
    return this.httpClient.delete<Course>(this.apiBaseCourses + `/${id}`)
  }

}
