import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { CoursesService } from '../services/courses.service';


@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map(data => CoursesActions.loadCoursesSuccess({ data })),
          catchError(error => of(CoursesActions.loadCoursesFailure({ error }))))
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.createCourse),
      concatMap((action) => 
        this.coursesService.addCourse(action.data).pipe(
          map(data => {
            this.coursesService.getCoursesList();
            return CoursesActions.createCourseSuccess({ data })
          }),
          catchError(error => of(CoursesActions.createCourseFailure({ error })))
        ))
    )
  });

  editCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.editCourse),
      concatMap((action) => 
        this.coursesService.editCourse(action.id, action.data).pipe(
          map(data => {
            this.coursesService.getCoursesList();
            return CoursesActions.editCourseSuccess({ data })
          }),
          catchError(error => of(CoursesActions.editCourseFailure({ error })))
        ))
    )
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.deleteCourse),
      concatMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(data => {
            this.coursesService.getCoursesList();
            return CoursesActions.deleteCourseSuccess({ data })
          }),
          catchError(error => of(CoursesActions.deleteCourseFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private coursesService: CoursesService) {}
}
