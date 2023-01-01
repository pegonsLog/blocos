import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { BlocosFormComponent } from './blocos-form/blocos-form.component';
import { BlocosListComponent } from './blocos-list/blocos-list.component';
import { ComponentsRoutingModule } from './blocos-routing.module';

@NgModule({
  declarations: [BlocosListComponent, BlocosFormComponent],
  imports: [CommonModule, ComponentsRoutingModule, AngularMaterialModule],
  exports: [BlocosListComponent, BlocosFormComponent],
})
export class BlocosModule {}
