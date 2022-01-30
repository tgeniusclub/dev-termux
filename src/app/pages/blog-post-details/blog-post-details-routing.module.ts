import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogPostDetailsPage } from './blog-post-details.page';

const routes: Routes = [
  {
    path: '',
    component: BlogPostDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogPostDetailsPageRoutingModule {}
