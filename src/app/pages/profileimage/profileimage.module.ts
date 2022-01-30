import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileimagePageRoutingModule } from './profileimage-routing.module';

import { ProfileimagePage } from './profileimage.page';
import { FormatFileSizePipe } from './format-file-size.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileimagePageRoutingModule
  ],
  declarations: [
    ProfileimagePage,
    FormatFileSizePipe]
})
export class ProfileimagePageModule {}
