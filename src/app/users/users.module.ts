import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';

import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../shared/pipes/pipes.module';
import { RouterModule, Routes } from '@angular/router';
import { TableUserComponent } from './components/TableUser/table-user.component';
import { DashboardUserComponent } from './pages/dashboard-users/dashboard-users.component';
import { ModalFormUserComponent } from './components/ModalFormUser/modal-form-user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardUserComponent
  }
]

@NgModule({
  declarations: [
    UsersComponent,
    TableUserComponent,
    DashboardUserComponent,
    ModalFormUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    DirectivesModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
