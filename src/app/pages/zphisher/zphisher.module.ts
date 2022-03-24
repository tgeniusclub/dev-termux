import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZphisherPageRoutingModule } from './zphisher-routing.module';

import { ZphisherPage } from './zphisher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZphisherPageRoutingModule
  ],
  declarations: [ZphisherPage]
})
export class ZphisherPageModule {}
