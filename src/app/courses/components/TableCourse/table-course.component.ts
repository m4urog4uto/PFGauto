import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/core/models';

@Component({
  selector: 'app-table-course',
  templateUrl: './table-course.component.html',
  styleUrls: ['./table-course.component.css']
})
export class TableCourseComponent implements OnChanges {

  @Input()
  items: Course[] = [];

  @Input()
  isAdmin: boolean = false;

  @Output()
  editCourse = new EventEmitter<number>();

  @Output()
  removeCourse = new EventEmitter<number>();

  dataSource = new MatTableDataSource(this.items);

  displayedColumns: string[] = ['courseName', 'description', 'duration', 'actions'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.items);
  }

  courseDetail(id: number): void {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
    });
  }

  courseEdit(id: number): void {
    this.editCourse.emit(id);
  }
  
  courseRemove(id: number): void {
    this.removeCourse.emit(id);
  }
}