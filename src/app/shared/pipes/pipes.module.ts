import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullNamePipe } from './full-name.pipe';
import { ControlErrorMessagesPipe } from './control-error-messages.pipe';
import { EllipsisPipe } from './ellipsis.pipe';

@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagesPipe,
    EllipsisPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    ControlErrorMessagesPipe,
    EllipsisPipe
  ]
})

export class PipesModule { }
