import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LugarPage } from './lugar.page';

const routes: Routes = [
  {
    path: '',
    component: LugarPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LugarPageRoutingModule {}
