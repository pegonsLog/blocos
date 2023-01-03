import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './blocos-detail/details.component';
import { BlocosFormComponent } from './blocos-form/blocos-form.component';
import { BlocosListComponent } from './blocos-list/blocos-list.component';

const routes: Routes = [
  {path: '', component: BlocosListComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'add', component: BlocosFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
