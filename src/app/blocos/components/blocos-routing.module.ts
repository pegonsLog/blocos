import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocosListComponent } from './blocos-list/blocos-list.component';

const routes: Routes = [
  {path: '', component: BlocosListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
