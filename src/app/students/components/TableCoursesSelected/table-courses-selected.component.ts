import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/core/models';

@Component({
  selector: 'app-table-courses-selected',
  templateUrl: './table-courses-selected.component.html',
  styleUrls: ['./table-courses-selected.component.css']
})
export class TableCoursesSelected implements OnChanges {

  @Input()
  items: Course[] = [];

  @Input()
  isAdmin: boolean = false;

  @Output()
  removeCourse = new EventEmitter<number>();

  dataSource = new MatTableDataSource(this.items);

  displayedColumns: string[] = ['courseName', 'description', 'duration', 'action'];

  constructor() {}

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.items);
  }

  courseRemove(id: number): void {
    this.removeCourse.emit(id);
  }
}