import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogPostDetailsPageRoutingModule } from './blog-post-details-routing.module';

import { BlogPostDetailsPage } from './blog-post-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogPostDetailsPageRoutingModule
  ],
  declarations: [BlogPostDetailsPage]
})
export class BlogPostDetailsPageModule {}
