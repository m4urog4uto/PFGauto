import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { CoursesService } from '../services/courses.service';


@Injectable()
export class CoursesEffects {

  loadCoursess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCoursesList().pipe(
          map(data => CoursesActions.loadCoursesSuccess({ data })),
          catchError(error => of(CoursesActions.loadCoursesFailure({ error }))))
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.deleteCourse),
      concatMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(data => {
            this.coursesService.getCourses();
            return CoursesActions.deleteCourseSuccess({ data })
          }),
          catchError(error => of(CoursesActions.deleteCourseFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private coursesService: CoursesService) {}
}
