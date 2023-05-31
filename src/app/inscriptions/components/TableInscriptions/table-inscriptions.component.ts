import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InscriptionsStudents, Student } from 'src/app/core/models';

@Component({
  selector: 'app-table-inscriptions',
  templateUrl: './table-inscriptions.component.html',
  styleUrls: ['./table-inscriptions.component.css']
})
export class TableInscriptionComponent implements OnChanges {

  @Input()
  items: Student[] = [];

  @Input()
  isAdmin: boolean = true;

  @Output()
  editStudent = new EventEmitter<number>();

  @Output()
  removeStudent = new EventEmitter<number>();

  dataSource = new MatTableDataSource(this.items);

  displayedColumns: string[] = ['dni', 'fullName', 'deleteStudent'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.items);
  }
  
  studentRemove(id: number): void {
    this.removeStudent.emit(id);
  }
}