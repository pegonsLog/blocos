import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './blocos-detail/details.component';
import { BlocosListAdmComponent } from './blocos-list-adm/blocos-list-adm.component';
import { BlocosListUserComponent } from './blocos-list-user/blocos-list-user.component';

const routes: Routes = [
  { path: 'adm', component: BlocosListAdmComponent },
  { path: 'user', component: BlocosListUserComponent },

  {
    path: 'forms',
    loadChildren: () =>
      import('src/app/blocos/components/blocos-form/bloco-form.module').then(
        (m) => m.BlocoFormModule
      ),
  },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
