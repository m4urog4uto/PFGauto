import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnChanges {

  @Input()
  items: User[] = [];

  @Output()
  editUser = new EventEmitter<number>();

  @Output()
  removeUser = new EventEmitter<number>();

  dataSource = new MatTableDataSource(this.items);

  displayedColumns: string[] = ['fullName', 'user', 'password', 'email', 'actions'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.items);
  }

  userDetail(id: number): void {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
    });
  };

  userEdit(id: number): void {
    this.editUser.emit(id);
  }
  
  userRemove(id: number): void {
    this.removeUser.emit(id);
  }
}