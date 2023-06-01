import { createFeature, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from 'src/app/core/models';

export const coursesFeatureKey = 'courses';

export interface State {
  loading: boolean;
  courses: Course[]
  error: unknown;
}

export const initialState: State = {
  loading: false,
  courses: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      courses: action.data
    }
  }),
  on(CoursesActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  // DELETE COURSE

  on(CoursesActions.deleteCourse, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(CoursesActions.deleteCourseSuccess, (state) => {
    return {
      ...state,
      loading: false,
    }
  }),
  on(CoursesActions.deleteCourseFailure, (state) => {
    return {
      ...state,
      loading: false,
    }
  })
);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});

