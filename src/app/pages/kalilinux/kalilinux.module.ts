import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KalilinuxPageRoutingModule } from './kalilinux-routing.module';

import { KalilinuxPage } from './kalilinux.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KalilinuxPageRoutingModule
  ],
  declarations: [KalilinuxPage]
})
export class KalilinuxPageModule {}
