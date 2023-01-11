import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { DetailsComponent } from './blocos-detail/details.component';
import { BlocosListAdmComponent } from './blocos-list-adm/blocos-list-adm.component';
import { BlocosListUserComponent } from './blocos-list-user/blocos-list-user.component';
import { ComponentsRoutingModule } from './blocos-routing.module';

@NgModule({
  declarations: [BlocosListAdmComponent, DetailsComponent, BlocosListUserComponent],
  imports: [CommonModule, ComponentsRoutingModule, AngularMaterialModule, FormsModule, ReactiveFormsModule],
  exports: [BlocosListAdmComponent, DetailsComponent, BlocosListUserComponent],
})
export class BlocosModule {}
