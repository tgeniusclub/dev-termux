import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermuxApiPageRoutingModule } from './termux-api-routing.module';

import { TermuxApiPage } from './termux-api.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermuxApiPageRoutingModule
  ],
  declarations: [TermuxApiPage]
})
export class TermuxApiPageModule {}
