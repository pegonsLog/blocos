import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlocosFormComponent } from './blocos-form/blocos-form.component';
import { BlocosListComponent } from './blocos-list/blocos-list.component';
import { ComponentsRoutingModule } from './blocos-routing.module';

@NgModule({
  declarations: [BlocosListComponent, BlocosFormComponent],
  imports: [CommonModule, ComponentsRoutingModule],
})
export class BlocosModule {}
