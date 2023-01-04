import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { DetailsComponent } from './blocos-detail/details.component';
import { BlocosListComponent } from './blocos-list/blocos-list.component';
import { ComponentsRoutingModule } from './blocos-routing.module';

@NgModule({
  declarations: [BlocosListComponent, DetailsComponent],
  imports: [CommonModule, ComponentsRoutingModule, AngularMaterialModule, FormsModule, ReactiveFormsModule],
  exports: [BlocosListComponent, DetailsComponent],
})
export class BlocosModule {}
