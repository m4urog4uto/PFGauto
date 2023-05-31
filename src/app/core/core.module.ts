import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: []
})
export class CoreModule { }
