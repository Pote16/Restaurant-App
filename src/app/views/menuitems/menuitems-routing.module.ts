import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuitemsComponent } from './menuitems.component';

const routes: Routes = [
  {
    path: '',
    component: MenuitemsComponent,
    data: {
      title: 'Menuitems',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuitemsRoutingModule { }
