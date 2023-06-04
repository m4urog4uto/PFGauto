import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/core/models';
import { StudentService } from 'src/app/students/services/student.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.css']
})
export class TableStudentComponent implements OnChanges {

  @Input()
  items: Student[] = [];

  @Input()
  isAdmin: boolean = false;

  @Output()
  editStudent = new EventEmitter<number>();

  @Output()
  removeStudent = new EventEmitter<number>();

  dataSource = new MatTableDataSource(this.items);

  displayedColumns: string[] = ['dni', 'fullName', 'email', 'phone', 'courseSelected', 'actions'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.items);
  }

  getCoursesName(coursesName: string[]): string[] {
    return coursesName.length > 0 ? coursesName : ['Sin Asignar'];
  }

  studentDetail(id: number): void {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
    });
  };

  studentEdit(id: number): void {
    this.editStudent.emit(id);
  }
  
  studentRemove(id: number): void {
    this.removeStudent.emit(id);
  }
}