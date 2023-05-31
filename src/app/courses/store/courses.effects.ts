import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CoursesActions } from './courses.actions';


@Injectable()
export class CoursesEffects {

  loadCoursess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.loadCoursess),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CoursesActions.loadCoursessSuccess({ data })),
          catchError(error => of(CoursesActions.loadCoursessFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
