import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login',
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AuthModule { }
