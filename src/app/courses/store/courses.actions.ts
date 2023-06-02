import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from 'src/app/core/models';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),

    'Create Course': props<{ data: Course }>(),
    'Create Course Success': props<{ data: unknown }>(),
    'Create Course Failure': props<{ error: unknown }>(),

    'Edit Course': props<{ data: Course }>(),
    'Edit Course Success': props<{ data: unknown }>(),
    'Edit Course Failure': props<{ error: unknown }>(),
  
    'Delete Course': props<{ id: number}>(),
    'Delete Course Success': props<{ data: unknown }>(),
    'Delete Course Failure': props<{ error: unknown }>(),
  }
});
