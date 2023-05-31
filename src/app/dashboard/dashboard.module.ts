import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentsComponent } from '../students/students.component';
import { InscriptionsComponent } from '../inscriptions/inscriptions.component';
import { CoursesComponent } from '../courses/courses.component';
import { AdminGuard } from '../users/guards/admin.guard';
import { UsersComponent } from '../users/users.component';

const routes: Routes = [
  {
    path: 'alumnos',
    component: StudentsComponent,
    loadChildren: () => import('../students/students.module').then((s) => s.StudentsModule)
  },
  {
    path: 'inscripciones',
    component: InscriptionsComponent,
    loadChildren: () => import('../inscriptions/inscriptions.module').then((i) => i.InscriptionsModule)
  },
  {
    path: 'cursos',
    component: CoursesComponent,
    loadChildren: () => import('../courses/courses.module').then((c) => c.CoursesModule)
  },
  {
    path: 'usuarios',
    component: UsersComponent,
    canActivate: [AdminGuard],
    loadChildren: () => import('../users/users.module').then((u) => u.UsersModule)
  },
  {
    path: '**',
    redirectTo: 'alumnos'
  }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DashboardModule { }
