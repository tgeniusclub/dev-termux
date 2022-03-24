import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZphisherPage } from './zphisher.page';

const routes: Routes = [
  {
    path: '',
    component: ZphisherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZphisherPageRoutingModule {}
