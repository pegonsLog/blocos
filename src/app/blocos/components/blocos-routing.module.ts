import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './blocos-detail/details.component';
import { BlocosListComponent } from './blocos-list/blocos-list.component';

const routes: Routes = [
  {path: '', component: BlocosListComponent},
  {path: 'details', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
