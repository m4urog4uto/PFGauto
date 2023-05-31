import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Coursess': emptyProps(),
    'Load Coursess Success': props<{ data: unknown }>(),
    'Load Coursess Failure': props<{ error: unknown }>(),
  }
});
