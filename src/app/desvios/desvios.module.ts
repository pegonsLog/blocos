import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesviosRoutingModule } from './desvios-routing.module';
import { ListDesviosComponent } from './list-desvios/list-desvios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { DesvioFormComponent } from './form-desvios/desvios-form.component';

@NgModule({
  declarations: [ListDesviosComponent, DesvioFormComponent],
  imports: [
    CommonModule,
    DesviosRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class DesviosModule {}
