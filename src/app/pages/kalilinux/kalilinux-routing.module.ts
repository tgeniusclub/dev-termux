import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KalilinuxPage } from './kalilinux.page';

const routes: Routes = [
  {
    path: '',
    component: KalilinuxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KalilinuxPageRoutingModule {}
