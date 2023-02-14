import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesvioFormComponent } from './form-desvios/desvios-form.component';
import { ListDesviosComponent } from './list-desvios/list-desvios.component';

const routes: Routes = [
  { path: 'list', component: ListDesviosComponent },
  { path: 'form', component: DesvioFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesviosRoutingModule { }
