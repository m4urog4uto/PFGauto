import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from './auth/guards/login.guard';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [LoginGuard],
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((a) => a.AuthModule) 
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((d) => d.DashboardModule)
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
