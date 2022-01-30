import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileimagePage } from './profileimage.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileimagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileimagePageRoutingModule {}
