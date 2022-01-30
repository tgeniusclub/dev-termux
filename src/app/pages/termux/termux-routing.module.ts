import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermuxPage } from './termux.page';

const routes: Routes = [
  {
    path: '',
    component: TermuxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermuxPageRoutingModule {}
