import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermuxPageRoutingModule } from './termux-routing.module';

import { TermuxPage } from './termux.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermuxPageRoutingModule
  ],
  declarations: [TermuxPage]
})
export class TermuxPageModule {}
