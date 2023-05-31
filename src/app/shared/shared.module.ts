import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material/material.module';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  NavbarComponent,
  ToolbarComponent
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivesModule,
    RouterModule,
  ],
  exports: COMPONENTS
})

export class SharedModule { }
