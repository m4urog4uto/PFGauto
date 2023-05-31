import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from './users/users.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    StudentsModule,
    CoursesModule,
    DashboardModule,
    InscriptionsModule,
    AuthModule,
    HttpClientModule,
    UsersModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
