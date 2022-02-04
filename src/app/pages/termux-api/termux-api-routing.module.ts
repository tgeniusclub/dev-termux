import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermuxApiPage } from './termux-api.page';

const routes: Routes = [
  {
    path: '',
    component: TermuxApiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermuxApiPageRoutingModule {}
