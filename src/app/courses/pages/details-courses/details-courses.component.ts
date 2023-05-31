import { Component } from '@angular/core';
import { Course } from 'src/app/core/models';
import { Observable } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-courses',
  templateUrl: './details-courses.component.html',
  styleUrls: ['./details-courses.component.css']
})
export class DetailsCoursesComponent {
  courseDetail$: Observable<Course | undefined>;

  constructor(private coursesService: CoursesService, private activatedRoute: ActivatedRoute) {
    this.courseDetail$ = this.coursesService.getCourseDetail(parseInt(this.activatedRoute.snapshot.params['courseId']));
  }
}
